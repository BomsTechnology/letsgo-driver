import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseStorage } from "@firebase";

export default function useFile() {
  const getFile = async (path: string) => {
    let errors = "";
    const starsRef = refStorage(firebaseStorage, path);
    console.log(starsRef);
    let link: string = "";
    await getDownloadURL(starsRef)
      .then((url) => {
        link = url;
      })
      .catch((error) => {
        switch (error.code) {
          case "firebaseStorage/object-not-found":
            errors = "File doesn't exist";
            break;
          case "firebaseStorage/unauthorized":
            errors = "User doesn't have permission to access the object";
            break;
          case "firebaseStorage/canceled":
            errors = "ser canceled the upload";
            break;
          case "firebaseStorage/unknown":
            errors = "Unknown error occurred, inspect the server response";
            break;
          default:
            errors = "errors to get file";
            break;
        }
      });

    return errors == ""
      ? { status: "success", response: link }
      : { status: "error", response: errors };
  };

  const deleteFile = async (path: string) => {
    let errors = "";
    const desertRef = refStorage(firebaseStorage, path);

    await deleteObject(desertRef)
      .then(() => {
        console.log("Deleted file!");
      })
      .catch((error) => {
        errors = error.message;
      });
    return errors == ""
      ? { status: "success", response: "Deleted file!" }
      : { status: "error", response: errors };
  };

  const uploadFile = async (file: File, path: string = "uploads") => {
    let errors = "";
    const firebaseStorageRef = refStorage(
      firebaseStorage,
      `${path}/${file.name}`
    );

    await uploadBytes(firebaseStorageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        errors = error.message;
      });
    return errors == ""
      ? { status: "success", response: "Uploaded a blob or file!" }
      : { status: "error", response: errors };
  };

  const setGalleriesFiles = async (
    fileToUpload: {name:string; file:Blob}[],
    path: string,
    fileToDelete: string[] = []
  ): Promise<string[]> => {
    return new Promise(async (resolve, reject) => {
      if (fileToDelete.length > 0) {
        fileToDelete.map(async (file) => {
          await deleteFile(file);
        });
      }
      if (fileToUpload.length > 0) {
        let filesPath: string[] = [];
        for (let i = 0; i < fileToUpload.length; i++) {
          let file = new File(
            [fileToUpload[i].file],
            `${new Date().getTime()}_${fileToUpload[i].name}`
          );
          await uploadFile(file, path);
          let response = await getFile(`${path}/${file.name}`);
          if (response.status == "success") {
            filesPath.push(response.response);
          } else {
            reject(response.response);
          }
        }
        resolve(filesPath);
      } else {
        resolve([]);
      }
    });
  };

  return {
    getFile,
    deleteFile,
    uploadFile,
    setGalleriesFiles,
  };
}
