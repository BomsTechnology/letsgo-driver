import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as ExpoImagePicker from "expo-image-picker";
import { showError } from "@functions/helperFunctions";

const ImagePicker = () => {
  const [attachements, setAttachements] = React.useState<string[]>([]);

  const pickImage = async () => {
    const { status } =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showError("Permission to access camera roll is required!");
    } else {
      let result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setAttachements([...attachements, result.assets[0].uri]);
      }
    }
  };

  const takePhoto = async () => {
    const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      showError("Permission to access camera is required!");
    } else {
      let result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setAttachements([...attachements, result.assets[0].uri]);
      }
    }
  };

  const removeImage = async (index: number) => {
    setAttachements(attachements.filter((_, i) => i !== index));
  }

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 10, flexWrap: 'wrap' }}>
        {attachements &&
          attachements.map((image, i) => (
            <View key={i} style={styles.image}>
              <TouchableOpacity
                style={[styles.shadowProp, styles.closeBtn]}
                onPress={() => removeImage(i)}
              >
                <Ionicons
                  name="close"
                  size={15}
                  color={Colors.secondaryColor}
                />
              </TouchableOpacity>
              <Image  source={{ uri: image }} resizeMode="cover"
                style={{ height: "100%", maxWidth: "100%",  width: '100%' }} />
            </View>
          ))}
        <View style={styles.image}>
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="folder" size={30} color={Colors.primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
            <Ionicons name="camera" size={35} color={Colors.secondaryColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  closeBtn: {
    backgroundColor: Colors.primaryColor,
    height: 20,
    width: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 1,
    right: 1,
    zIndex: 2
  },
  shadowProp: {
    shadowColor: "#171717",
    elevation: 4,
  },
  image: {
    height: 100,
    backgroundColor: Colors.whiteTone2,
    marginTop: 10,
    width: "30%",
    flexShrink: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: 'hidden'
  },
});
