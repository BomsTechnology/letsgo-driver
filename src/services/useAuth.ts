import { AuthStateTokenProps } from "@store/features/auth/authSlice";
import  axiosClient, { API_BASE_URL } from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Device  from 'expo-device';
import Constants  from "expo-constants";
import axios from "axios";
import SettingProps from "../types/SettingProps";
import { setSetting } from "@store/features/setting/settingSlice";
import UserProps from "@mytypes/UserProps";
import { setDriverInfo } from "@store/features/driver/driverSlice";

export const PREFIX_URL = 'AUTH-SERVICE/api/v0/';

export const sendOTP = createAsyncThunk<string, string>(
  "auth/sendOTP",
  async (phoneNumber: string) => {
    let data = {
      phoneNumber: phoneNumber,
      deviceManufacturer: Device.manufacturer,
      deviceModel: Device.modelName,
      bundleId: Device.osBuildId,
      deviceName: Device.deviceName,
      deviceId: `${Device.deviceName}-${Device.osBuildId}`,
      deviceOs: ['IOS', 'ANDROID', 'DESKTOP'].includes(Device.osName?.toUpperCase()!) ? Device.osName?.toUpperCase() : 'UNKNOWN',
    };

    try {
      const response =  await axiosClient.post<{
        status: string;
        verificationId: string;
      }>(PREFIX_URL + "mobile/register/phone", data);
   
      if (response.data != undefined) {
        return response?.data.verificationId;
      } else {
        throw new Error(
          "Une erreur réseau s'est produite"
        );
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const verifyOTP = createAsyncThunk<
  AuthStateTokenProps,
  { code: string; verificationId: string }
>( "auth/verifyOTP", async ({ code, verificationId }, thunkAPI) => {
  let data = {
    verification_id: verificationId,
    verification_code: code,
    device_id: `${Device.deviceName}-${Device.osBuildId}`,
  };
  try {
    const response = await axiosClient.post<AuthStateTokenProps>(
      PREFIX_URL +  "auth/sms/code/verify",
      data
    );
    if (response && response.data != undefined) {
      console.log("verify otp OK");
      console.log(response.data)
      await AsyncStorage.setItem("token", JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error(
        "Une erreur réseau s'est produite"
      );
    }
  } catch (error: any) {
    console.log("verify FALSE");
    throw new Error(
      `Une erreur s'est produite : ${error.response.data.error}`
    );
  }
});


export const logout = createAsyncThunk<void, void>(
  "auth/logout",
  async () => {
    try {
     /* let response = await axiosClient.put( PREFIX_URL + `auth/devices/${Device.deviceName}-${Device.osBuildId}/terminate`);
      if (response.data) {*/
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");
     /* } else {
        throw new Error("Déconnexion impossible.");
      }*/
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la déconnexion : ${error.response.data.error}`
      );
    }
  }
);

export const checkAuth = createAsyncThunk<AuthStateTokenProps, SettingProps>(
  "auth/checkAuth",
  async (setting, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const driver = await AsyncStorage.getItem("driver");
      if (token && driver) {
        thunkAPI.dispatch(setSetting(setting));
        thunkAPI.dispatch(setDriverInfo(JSON.parse(driver)));
        return JSON.parse(token) as AuthStateTokenProps;
      } else {
        //await AsyncStorage.removeItem("token");
        throw new Error(
          `L'utilisateur n'est pas authentifié. Veuillez vous connecter.`
        );
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite lors de la récupération des données`
      );
    }
  }
);



export const createDriverAccount = createAsyncThunk<boolean, void>(
	"auth/createDriverAccount",
	async () => {
	  try {
		const response = await axiosClient.post(
			PREFIX_URL + "business/subscribe/letsgo/driver"
		);
  
		if (response.status < 400 ) {
      console.log("subscribe OK");
		  return true;
		} else {
		  throw new Error(
			"Une erreur réseau s'est produite"
		  );
		}
	  } catch (error: any) {
      console.log("subscribe FALSE");
		throw new Error(
		  `Une erreur s'est produite : ${error.response.data.error}`
		);
	  }
	}
  );


  export const refreshTokens = createAsyncThunk<
  AuthStateTokenProps,
  string 
>( "auth/refreshTokens", async ( refreshToken: string, thunkAPI) => {
  let data = { 
    refreshToken: refreshToken,
    deviceId: `${Device.deviceName}-${Device.osBuildId}`,
  };
  try {
    const response = await axiosClient.post<AuthStateTokenProps>(
      PREFIX_URL +  "auth/refresh",
      data
    );
    if (response && response.data != undefined) {
      console.log("refresh token OK");
      await AsyncStorage.setItem("token", JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error(
        "Une erreur réseau s'est produite"
      );
    }
  } catch (error: any) {
    console.log("refresh token FALSE");
    throw new Error(
      `Une erreur s'est produite : ${error.response.data.error}`
    );
  }
});
