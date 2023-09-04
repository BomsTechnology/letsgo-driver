import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import SettingProps from "../types/SettingProps";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setThemeMode = createAsyncThunk<SettingProps, SettingProps>(
  "setting/setThemeMode",
  async (setting: SettingProps) => {
    setting.isDarkMode = !setting.isDarkMode;
    // set online setting
    return setting;
  }
);

export const setLanguage = createAsyncThunk<
  SettingProps,
  { setting: SettingProps; lang: string }
>(
  "setting/setLanguage",
  async (data: { setting: SettingProps; lang: string }) => {
    data.setting.language = data.lang;
    // set online setting
    return data.setting;
  }
);

export const getLocalSetting = async (): Promise<SettingProps> => {
  const setting = await AsyncStorage.getItem("setting");
  if(!setting){
    let newSetting = {
        isDarkMode: false,
        language: "en",
      }
    await AsyncStorage.setItem("setting", JSON.stringify(newSetting))
    return newSetting;
  }else{
    return JSON.parse(setting) as SettingProps;
  };
  
};

export const setOnlineSetting = () => {};
