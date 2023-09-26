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
import DatePicker from "@components/inputFields/DatePicker";
import CustomDropdownInput, {
  DropDataProps,
} from "@components/inputFields/CustomDropdownInput";
import { Profile } from "../../types/TimeTableProps";
import { updateDriverProfile } from "@services/useDriver";
import * as ExpoImagePicker from "expo-image-picker";

const PersonnalInformationScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const driverState = useAppSelector((state: RootState) => state.driver);
  const dispatch = useAppDispatch();
  const [asError, setAsError] = useState(false);
  const [birthdate, setBirthdate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState<{ name: string; file: Blob } | null>(null);
  const [defaultGender, setDefaultGender] = useState<DropDataProps | undefined>(
    undefined
  );
  const [selected, setSelected] = useState("");
  const genderData: DropDataProps[] = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ];
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Profile>();

  const firstname = watch("firstName");
  const lastname = watch("lastName");

  const editProfile = async () => {
    console.log("====================================");
    console.log("edit");
    console.log("====================================");
    console.log({
      firstName: firstname!,
      lastName: lastname!,
      gender: selected,
      birthdate: birthdate.toISOString().split("T")[0],
    },)
    await dispatch(
      updateDriverProfile({
        profile: {
          firstName: firstname!,
          lastName: lastname!,
          gender: selected,
          birthdate: birthdate.toISOString().split("T")[0],
        },
        file: file,
        removeAvatar: avatar == "" ? true : false
      })
    )
      .unwrap()
      .then((data) => {
        showSuccess("User Data Update");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

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
        setAvatar(result.assets[0].uri);
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        setFile({ file: blob, name: result.assets[0].uri.split("/").pop()! });
      }
    }
  };

  const refreshData = async () => {
    await dispatch(getUserInfo())
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

    console.log(driverState);

    setValue(
      "firstName",
      driverState.driver?.firstName ? driverState.driver?.firstName : ""
    );
    setValue(
      "lastName",
      driverState.driver?.lastName ? driverState.driver?.lastName : ""
    );
    if(driverState.driver?.picture) setAvatar(driverState.driver?.picture);
    if (driverState.driver?.birthdate)
      setBirthdate(new Date(Date.parse(driverState.driver?.birthdate)));
    if (driverState.driver?.gender)
      setDefaultGender(
        genderData.filter((g) => g.value == driverState.driver?.gender)[0]
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
        <SimpleHeader text="Profile" />
        <View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {avatar ? (
            <Image
              resizeMode="cover"
              style={[styles.image]}
              source={{ uri: avatar }}
            />
          ) : (
            <Ionicons
              name="person-circle"
              size={120}
              color={Colors.primaryColor}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={pickImage}
              style={
                settingState.setting.isDarkMode
                  ? styles.actionBtn_DARK
                  : styles.actionBtn
              }
            >
              <Ionicons name="pencil" size={16} color={Colors.primaryColor} />
              <Text
                style={{
                  color: settingState.setting.isDarkMode
                    ? Colors.onPrimaryColor
                    : Colors.onWhiteTone,
                }}
              >
                Edit avatar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAvatar("");
                setFile(null);
              }}
              style={
                settingState.setting.isDarkMode
                  ? styles.actionBtn_DARK
                  : styles.actionBtn
              }
            >
              <Ionicons name="trash" size={16} color={Colors.errorInputColor} />
              <Text
                style={{
                  color: settingState.setting.isDarkMode
                    ? Colors.onPrimaryColor
                    : Colors.onWhiteTone,
                }}
              >
                Delete Picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
          Last Name
        </Text>
        <CustomInput
          placeholder="Enter your Last Name"
          name="lastName"
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
          First Name
        </Text>
        <CustomInput
          placeholder="Enter your First Name"
          name="firstName"
          control={control}
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
          Birth Date
        </Text>
        <DatePicker
          date={birthdate}
          setDate={setBirthdate}
          bgColor={
            settingState.setting.isDarkMode
              ? Colors.darkTone2
              : Colors.whiteTone1
          }
        />

        <Text
          style={[
            settingState.setting.isDarkMode
              ? styles.semiBoldText_DARK
              : styles.semiBoldText,
            { marginTop: 10 },
          ]}
        >
          Gender
        </Text>
        <CustomDropdownInput
          placeholder="Select your gender"
          data={genderData}
          setSelected={setSelected}
          search={false}
          asError={asError}
          errorMessage={errorMessage}
          defaultOption={defaultGender}
        />

        <CustomButton
          bgColor={Colors.primaryColor}
          fgColor="#fff"
          isReady={true}
          onPress={handleSubmit(editProfile)}
          marginVertical={30}
          text="update"
          loading={driverState.loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
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
export default PersonnalInformationScreen;
