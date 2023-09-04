import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserProps from "../../../types/UserProps";
import {
  createDriverAccount,
  getUserInfo,
  updateUserInfo,
} from "@services/useUser";

export interface userState {
  user: UserProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: userState = {
  loading: false,
  user: {
    keywords: [],
  },
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    infoClear: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    setUserInfo: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    addKeyword: (state, action: PayloadAction<string>) => {
      if(!state.user?.keywords){
        state.user!.keywords = [action.payload];
      }else{
        state.user?.keywords.push(action.payload);
      }
    },
    removeKeyword: (state, action: PayloadAction<string>) => {
      state.user?.keywords?.splice(
        state.user?.keywords?.indexOf(action.payload),
        1
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDriverAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createDriverAccount.fulfilled,
        (state, action: PayloadAction<UserProps>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(createDriverAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserInfo.fulfilled,
        (state, action: PayloadAction<UserProps>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserInfo.fulfilled,
        (state, action: PayloadAction<UserProps>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { infoClear, setUserInfo, addKeyword, removeKeyword } =
  userSlice.actions;

export default userSlice.reducer;
