import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@components/buttons/CustomButton";
import { useForm } from "react-hook-form";
import CustomInput from "@components/inputFields/CustomInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { ScrollView } from "react-native-gesture-handler";
import {
  getUserInfo,
  updateUserInfo,
  createPoolerAccount,
} from "@services/useUser";
import { showError, showSuccess } from "@functions/helperFunctions";
import DatePicker from "@components/inputFields/DatePicker";
import CustomDropdownInput, {
  DropDataProps,
} from "@components/inputFields/CustomDropdownInput";

const ProfileScreen = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  const userState = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [asError, setAsError] = useState(false);
  const [birthdate, setBirthdate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultGender, setDefaultGender] = useState<DropDataProps | undefined>(undefined);
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
  } = useForm();

  const firstname = watch("firstname");
  const lastname = watch("lastname");

  const editProfile = async () => {
    await dispatch(updateUserInfo({
      firstName: firstname,
      lastName: lastname,
      gender: selected,
      birthdate: birthdate.toISOString().split("T")[0],
    }))
      .unwrap()
      .then((data) => {
        showSuccess("User Data Update");
      })
      .catch((error) => {
        showError(error.message);
      });
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
    if (!userState.user) refreshData();
    
    setValue(
      "firstname",
      userState.user?.firstName ? userState.user?.firstName : ""
    );
    setValue(
      "lastname",
      userState.user?.lastName ? userState.user?.lastName : ""
    );
    console.log(userState.user?.gender);
    if(userState.user?.birthdate) setBirthdate(new Date(Date.parse(userState.user?.birthdate)));
    if(userState.user?.gender) setDefaultGender(genderData.filter((g) => g.value == userState.user?.gender)[0])
  }, []);

  return (
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
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
          <Image
            resizeMode="contain"
            style={[styles.image]}
            source={require("@assets/images/avatars/Avatar5.png")}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
               style={settingState.setting.isDarkMode ? styles.actionBtn_DARK : styles.actionBtn}
            >
              <Ionicons name="pencil" size={16} color={Colors.primaryColor} />
              <Text style={{ 
                color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.onWhiteTone
               }}>Edit avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={settingState.setting.isDarkMode ? styles.actionBtn_DARK : styles.actionBtn}
            >
              <Ionicons name="trash" size={16} color={Colors.errorInputColor} />
              <Text style={{ 
                color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.onWhiteTone
               }}>Delete Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={[settingState.setting.isDarkMode ? styles.contentScroll_DARK : styles.contentScroll]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText}>Last Name</Text>
        <CustomInput
          placeholder="Enter your Last Name"
          name="lastname"
          control={control}
          secureTextEntry={false}
          bgColor={settingState.setting.isDarkMode ? Colors.darkTone2 : Colors.whiteTone2}
          rules={{
            required: "The Last Name is required",
          }}
        />
        <Text style={[settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText, { marginTop: 10 }]}>First Name</Text>
        <CustomInput
          placeholder="Enter your First Name"
          name="firstname"
          control={control}
          secureTextEntry={false}
          bgColor={settingState.setting.isDarkMode ? Colors.darkTone2 : Colors.whiteTone2}
          rules={{
            required: "The First Name is required",
          }}
        />

        <Text style={[settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText, { marginTop: 10 }]}>Birth Date</Text>
        <DatePicker
          date={birthdate}
          setDate={setBirthdate}
          bgColor={settingState.setting.isDarkMode ? Colors.darkTone2 : Colors.whiteTone1}
        />

        <Text style={[settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText, { marginTop: 10 }]}>Gender</Text>
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
          isReady={selected && birthdate && lastname && firstname}
          onPress={handleSubmit(editProfile)}
          marginVertical={30}
          text="update profile"
          loading={userState.loading}
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
  }
});
export default ProfileScreen;
