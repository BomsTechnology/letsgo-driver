import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@components/buttons/CustomButton";
import { useForm } from "react-hook-form";
import CustomInput from "@components/inputFields/CustomInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { getUserInfo, updateUserInfo } from "@services/useUser";
import { showError, showSuccess } from "@functions/helperFunctions";
import ImagePicker from "@components/inputFields/ImagePicker";
import { getDriverInfo, updateDriverBusiness } from "@services/useDriver";

const BusinessInformationScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const driverState = useAppSelector((state: RootState) => state.driver);
  const dispatch = useAppDispatch();
  const [files, setFiles] = React.useState<{ name: string; file: Blob }[]>([]);
  const [oldFiles, setOldFiles] = React.useState<string[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const businessName = watch("businessName");
  const businessDescription = watch("businessDescription");
  const cvLink = watch("cvLink");
  const yearsOfExperience = watch("yearsOfExperience");

  const editProfile = async () => {
    await dispatch(
      updateDriverBusiness({
        businessInformation: {
          businessName: businessName,
          businessDescription: businessDescription,
          cvLink: cvLink,
          yearsOfExperience: yearsOfExperience,
        },
        files: files,
        oldFiles: oldFiles,
      })
    )
      .unwrap()
      .then((data) => {
        setFiles([])
        setOldFiles(driverState.driver?.docs!);
        showSuccess("User Data Update");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  const refreshData = async () => {
    await dispatch(getDriverInfo())
      .unwrap()
      .then((data) => {
        showSuccess("User Data Refresh");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  useEffect(() => {
    if (!driverState.driver) refreshData();
    setOldFiles(driverState.driver?.docs!);
    setValue(
      "businessName",
      driverState.driver?.businessName ? driverState.driver?.businessName : ""
    );
    setValue(
      "businessDescription",
      driverState.driver?.businessDescription ? driverState.driver?.businessDescription : ""
    );
    setValue(
      "cvLink",
      driverState.driver?.cvLink ? driverState.driver?.cvLink : ""
    );
    setValue(
      "yearsOfExperience",
      driverState.driver?.businessDescription ? driverState.driver?.yearsOfExperience?.toString() : ""
    );
  }, []);

  return (
    <SafeAreaView
      style={
        settingState.setting.isDarkMode
          ? styles.container_DARK
          : styles.container
      }
    >
      <View style={{ paddingHorizontal: 20 }}>
        <SimpleHeader text="B. Information" />
      </View>

      <ScrollView
        style={[
          settingState.setting.isDarkMode
            ? styles.contentScroll_DARK
            : styles.contentScroll,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={
            settingState.setting.isDarkMode
              ? styles.semiBoldText_DARK
              : styles.semiBoldText
          }
        >
          Business Name
        </Text>
        <CustomInput
          placeholder="Enter your Business Name"
          name="businessName"
          control={control}
          secureTextEntry={false}
          bgColor={
            settingState.setting.isDarkMode
              ? Colors.darkTone2
              : Colors.whiteTone2
          }
          rules={{
            required: "The Last Name is required",
          }}
        />
        <Text
          style={[
            settingState.setting.isDarkMode
              ? styles.semiBoldText_DARK
              : styles.semiBoldText,
            { marginTop: 10 },
          ]}
        >
          Description
        </Text>
        <CustomInput
          placeholder="Enter your Business description"
          name="businessDescription"
          control={control}
          multiline={true}
          secureTextEntry={false}
          bgColor={
            settingState.setting.isDarkMode
              ? Colors.darkTone2
              : Colors.whiteTone2
          }
          rules={{
            required: "The First Name is required",
          }}
        />

        <Text
          style={[
            settingState.setting.isDarkMode
              ? styles.semiBoldText_DARK
              : styles.semiBoldText,
            { marginTop: 10 },
          ]}
        >
          CV Link
        </Text>
        <CustomInput
          placeholder="Enter your CV Link"
          name="cvLink"
          control={control}
          secureTextEntry={false}
          bgColor={
            settingState.setting.isDarkMode
              ? Colors.darkTone2
              : Colors.whiteTone2
          }
          rules={{}}
        />

        <Text
          style={[
            settingState.setting.isDarkMode
              ? styles.semiBoldText_DARK
              : styles.semiBoldText,
            { marginTop: 10 },
          ]}
        >
          Year Of Experience
        </Text>
        <CustomInput
          placeholder="0"
          name="yearsOfExperience"
          control={control}
          secureTextEntry={false}
          keyboardType="number-pad"
          bgColor={
            settingState.setting.isDarkMode
              ? Colors.darkTone2
              : Colors.whiteTone2
          }
          rules={{}}
        />

        <Text
          style={[
            settingState.setting.isDarkMode
              ? styles.semiBoldText_DARK
              : styles.semiBoldText,
            { marginTop: 10 },
          ]}
        >
          Business Images
        </Text>
        <ImagePicker
          setFiles={setFiles}
          files={files}
          oldFiles={oldFiles}
          setOldFiles={setOldFiles}
        />

        <CustomButton
          bgColor={Colors.primaryColor}
          fgColor="#fff"
          isReady={businessName && yearsOfExperience}
          onPress={handleSubmit(editProfile)}
          marginVertical={30}
          text="update"
          loading={driverState.loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone3,
    paddingTop: 20,
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    paddingTop: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 0.5,
    borderColor: Colors.grayTone4,
    backgroundColor: Colors.whiteTone1,
  },
  contentScroll: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    position: "relative",
    marginTop: 10,
    backgroundColor: Colors.whiteTone1,
  },
  contentScroll_DARK: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    position: "relative",
    marginTop: 10,
    backgroundColor: Colors.darkTone1,
  },
  semiBoldText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: Colors.onWhiteTone,
  },
  semiBoldText_DARK: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: Colors.onPrimaryColor,
  },
  lightText: {
    fontSize: 12,
    fontFamily: "Poppins_300Light",
    color: Colors.grayTone2,
  },
  lightText_DARK: {
    fontSize: 12,
    fontFamily: "Poppins_300Light",
    color: Colors.grayTone2,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.whiteTone1,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  actionBtn_DARK: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.darkTone2,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
