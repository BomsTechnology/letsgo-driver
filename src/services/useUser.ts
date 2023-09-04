import axiosClient, { API_BASE_URL } from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import UserProps from "../types/UserProps";

const PREFIX_URL = 'AUTH-SERVICE/api/v0/';

export const createDriverAccount = createAsyncThunk<UserProps, void>(
  "user/createDriverAccount",
  async () => {
    try {
      const response = await axiosClient.post(
        PREFIX_URL + "business/subscribe/letsgo/driver"
      );

      if (response) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error(
          "Une erreur réseau s'est produite"
        );
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error} create pooler account`
      );
    }
  }
);

export const getUserInfo = createAsyncThunk<UserProps, void>(
  "user/getUserInfo",
  async () => {
    try {
      const response = await axiosClient.get(PREFIX_URL + "userinfo");
      if (response) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error(
          "Une erreur réseau s'est produite"
        );
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error} get user info`
      );
    }
  }
);

export const updateUserInfo = createAsyncThunk<
  UserProps,
  {
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: string;
    avatar?: string;
    picture?: string;
    keywords?: string;
    userPaymentMode?: string;
  }
>("user/updateUserInfo", async ({
  firstName,
  lastName,
  birthdate,
  avatar,
  picture,
  keywords,
  userPaymentMode,
  gender
}) => {
  try {
    let data = {
      firstName: firstName,
      lastName:   lastName,
      birthdate: birthdate,
      avatar: avatar,
      picture: picture,
      keywords: keywords,
      userPaymentMode: userPaymentMode,
      gender: gender
    }
    const response = await axiosClient.put(PREFIX_URL + "userinfo", data);
    if (response.data != undefined) {
      AsyncStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error(
        "Une erreur réseau s'est produite"
      );
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});
