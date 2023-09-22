import axiosClient, { API_BASE_URL } from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BusinessInformation,
  Driver,
  DriverAvaibility,
  DriverExperience,
  DriverPricing,
  DriverSkill,
  HumanIdentity,
  Profile,
  WorkZone,
} from "@mytypes/TimeTableProps";
import { AxiosError, AxiosResponse } from "axios";
import { PREFIX_URL as AUTH_PREFIX_URL } from "@services/useAuth";
import useFile from "./useFile";
import { RootState } from "@store/store";
import { AuthState } from "@store/features/auth/authSlice";
import { driverState } from "@store/features/driver/driverSlice";
import { SettingState } from "@store/features/setting/settingSlice";

const PREFIX_URL_WITHOUT_SLASH = "DRIVER-SERVICE/api/v0/drivers";
const PREFIX_URL = PREFIX_URL_WITHOUT_SLASH + "/";

export const apiCallWrapper = async <T>(response: AxiosResponse<T>) => {
  return new Promise<T>(async (resolve, reject) => {
    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

export const changeDriverWorkzone = async (data: WorkZone) => {
  return new Promise<WorkZone>(async (resolve, reject) => {
    const response = await axiosClient.put<WorkZone>(
      PREFIX_URL + "work-zone",
      data
    );

    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

export const changeDriverAvailabality = async (data: DriverAvaibility) => {
  return new Promise<DriverAvaibility>(async (resolve, reject) => {
    const response = await axiosClient.put<DriverAvaibility>(
      PREFIX_URL + "availability",
      data
    );

    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

export const changeDriverPricing = async (data: DriverPricing) => {
  return new Promise<DriverPricing>(async (resolve, reject) => {
    const response = await axiosClient.put<DriverPricing>(
      PREFIX_URL + "pricing",
      data
    );

    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};

/*export const updateDriverBusiness = async (data: BusinessInformation) => {
  return new Promise<Driver>(async (resolve, reject) => {
    const response = await axiosClient.put<Driver>(
      PREFIX_URL_WITHOUT_SLASH,
      data
    );

    if (response.data != undefined) {
      return resolve(response.data);
    } else {
      return reject(new Error("Une erreur réseau s'est produite"));
    }
  });
};*/

export const updateDriverBusiness = createAsyncThunk<
  Driver,
  {
    businessInformation: BusinessInformation;
    files: { name: string; file: Blob }[];
    oldFiles: string[];
  }
>(
  "driver/updateDriverBusiness",
  async (
    data: {
      businessInformation: BusinessInformation;
      files: { name: string; file: Blob }[];
      oldFiles: string[];
    },
    thunkAPI
  ) => {
    try {
      const { setGalleriesFiles } = useFile();
      const { driver } = thunkAPI.getState() as RootState;

      let deletedImages = driver.driver!.docs!.filter(
        (image) => !data.oldFiles.includes(image)
      );

      const uploadResponse = await setGalleriesFiles(
        data.files,
        "driver/docs",
        deletedImages
      );
      console.log("oldFiles", data.oldFiles);
      console.log("uploadResponse:", uploadResponse);
      data.businessInformation.docs = [...data.oldFiles, ...uploadResponse];
      console.log(
        "data.businessInformation.attachments:",
        data.businessInformation.docs
      );
      const response = await axiosClient.put<Driver>(
        PREFIX_URL_WITHOUT_SLASH,
        data.businessInformation
      );
      if (response && response.data != undefined) {
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);


export const updateDriverProfile = createAsyncThunk<Driver, Profile>(
  "driver/getDriverInfo", async (data: Profile) => {
    try {

      const response = await axiosClient.put<Driver>(
        PREFIX_URL + "profile",
        data,
        {}
      );
 
    
      if (response && response.data != undefined) {

        await AsyncStorage.setItem("driver", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    }
    catch (error: any) {

      if (error.response){

        throw new Error(
          `Une erreur s'est produite : ${error.response.data.error}`
        );

      }
      else {

        throw new Error(
          `Network Error`
        );

      }
 

    }


  });

export const getDriverInfo = createAsyncThunk<Driver, undefined>(
  "driver/getDriverInfo",
  async () => {
    try {
      const response = await axiosClient.get<Driver>(PREFIX_URL_WITHOUT_SLASH);

      if (response && response.data != undefined) {
        AsyncStorage.setItem("driver", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const upgradeToDriver = createAsyncThunk<Driver, undefined>(
  "driver/upgradeToDriver",
  async () => {
    try {
      console.log("create driver ");

      const response = await axiosClient.post<Driver>(PREFIX_URL_WITHOUT_SLASH);

      if (response.status < 400 && response.data != undefined) {
        AsyncStorage.setItem("driver", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      console.log(error.response.data)
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const removeDriverSkill = createAsyncThunk<DriverSkill[], string>(
  "driver/removeDriverSkill",
  async (skillName: string) => {
    try {
      const response = await axiosClient.delete<DriverSkill[]>(
        PREFIX_URL + "skills/" + skillName
      );

      if (response.data != undefined) {
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const addOrUpdateDriverSkill = createAsyncThunk<
  DriverSkill[],
  DriverSkill
>("driver/addOrUpdateDriverSkill", async (data: DriverSkill) => {
  try {
    const response = await axiosClient.post<DriverSkill[]>(
      PREFIX_URL + "skills",
      data
    );

    if (response.data != undefined) {
      return response.data;
    } else {
      throw new Error("Une erreur réseau s'est produite");
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});

export const removeDriverExperience = createAsyncThunk<
  DriverExperience[],
  string
>("driver/removeDriverExperience", async (label: string, thunkAPI) => {
  try {
    const { setGalleriesFiles } = useFile();
    const { driver } = thunkAPI.getState() as RootState;
    let currDriver = driver.driver!.experiences!.filter(
      (file) => file.label.toLocaleLowerCase() === label.toLocaleLowerCase()
    )[0];
    await setGalleriesFiles([], "driver/experiences", currDriver.attachments!);
    const response = await axiosClient.delete<DriverExperience[]>(
      PREFIX_URL + "experiences/" + label
    );

    if (response.data != undefined) {
      return response.data;
    } else {
      throw new Error("Une erreur réseau s'est produite");
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});

export const addOrUpdateDriverExperience = createAsyncThunk<
  DriverExperience[],
  {
    driverExperience: DriverExperience;
    files: { name: string; file: Blob }[];
    oldFiles: string[];
  }
>(
  "driver/addOrUpdateDriverExperience",
  async (
    data: {
      driverExperience: DriverExperience;
      files: { name: string; file: Blob }[];
      oldFiles: string[];
    },
    thunkAPI
  ) => {
    try {
      let deletedImages: string[] = [];
      const { setGalleriesFiles } = useFile();
      const { driver } = thunkAPI.getState() as RootState;
      let currDriver = driver.driver!.experiences!.filter(
        (file) =>
          file.label.toLocaleLowerCase() ===
          data.driverExperience.label.toLocaleLowerCase()
      )[0];
      if (currDriver) {
        deletedImages = currDriver.attachments!.filter(
          (image) => !data.oldFiles.includes(image)
        );
      }

      const uploadResponse = await setGalleriesFiles(
        data.files,
        "driver/experiences",
        deletedImages
      );
      console.log("oldFiles", data.oldFiles);
      console.log("uploadResponse:", uploadResponse);
      data.driverExperience.attachments = [...data.oldFiles, ...uploadResponse];
      console.log(
        "data.driverExperience.attachments:",
        data.driverExperience.attachments
      );
      const response = await axiosClient.post<DriverExperience[]>(
        PREFIX_URL + "experiences",
        data.driverExperience
      );
      if (response.data != undefined) {
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const removeDriverLicence = createAsyncThunk<HumanIdentity[], string>(
  "driver/removeDriverLicence",
  async (licenceId: string, thunkAPI) => {
    try {
      const { setGalleriesFiles } = useFile();
      const { driver } = thunkAPI.getState() as RootState;
      let currDriver = driver.driver!.driverLicences!.filter(
        (file) =>
          file.identityUId!.toLocaleLowerCase() ===
          licenceId.toLocaleLowerCase()
      )[0];
      await setGalleriesFiles([], "driver/licences", currDriver.docs!);
      const response = await axiosClient.delete<HumanIdentity[]>(
        PREFIX_URL + "licences/" + licenceId
      );

      if (response.data != undefined) {
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const addOrUpdateDriverLicence = createAsyncThunk<
  HumanIdentity[],
  {
    humanIdentity: HumanIdentity;
    files: { name: string; file: Blob }[];
    oldFiles: string[];
  }
>(
  "driver/addOrUpdateDriverLicence",
  async (
    data: {
      humanIdentity: HumanIdentity;
      files: { name: string; file: Blob }[];
      oldFiles: string[];
    },
    thunkAPI
  ) => {
    try {
      let deletedImages: string[] = [];
      const { setGalleriesFiles } = useFile();
      const { driver } = thunkAPI.getState() as RootState;
      let currDriver = driver.driver!.driverLicences!.filter(
        (file) =>
          file.identityUId!.toLocaleLowerCase() ===
          data.humanIdentity.identityUId!.toLocaleLowerCase()
      )[0];
      if (currDriver) {
        deletedImages = currDriver.docs!.filter(
          (image) => !data.oldFiles.includes(image)
        );
      }

      const uploadResponse = await setGalleriesFiles(
        data.files,
        "driver/licences",
        deletedImages
      );
      console.log("oldFiles", data.oldFiles);
      console.log("uploadResponse:", uploadResponse);
      data.humanIdentity.docs = [...data.oldFiles, ...uploadResponse];
      console.log("data.humanIdentity.docs:", data.humanIdentity.docs);
      const response = await axiosClient.post<HumanIdentity[]>(
        PREFIX_URL + "licences",
        data.humanIdentity
      );
      if (response.data != undefined) {
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const changeDriverAvailability = createAsyncThunk<
  DriverAvaibility,
  DriverAvaibility
>("driver/updateAvailability", async (data) => {
  try {
    const response = await axiosClient.put<DriverAvaibility>(
      PREFIX_URL + "availability",
      data
    );

    if (response.data != undefined) {
      return response.data;
    } else {
      throw new Error("Une erreur réseau s'est produite");
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});
function async(
  arg0: undefined,
  thunkAPI: any
): import("@reduxjs/toolkit").AsyncThunkPayloadCreator<
  HumanIdentity,
  void,
  {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
  }
> {
  throw new Error("Function not implemented.");
}
