import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sendOTP, checkAuth, verifyOTP, logout } from '@services/useAuth';

export interface AuthStateTokenProps {
  "access_token": string | null;
  "expires_in": string | null;
  "refresh_token": string | null;
  "refresh_token_expires_in": string | null;
  "token_type": string | null;
  "role": string[] | null;
}

export interface AuthState {
  "loading": boolean;
  "token": AuthStateTokenProps | null;
  "isFirstLogin": boolean;
  "verificationId"?: string | null;
  "error": string | null;
}


const initialState: AuthState = {
  "token": null,
  "loading": false,
  "isFirstLogin": true,
  "error": null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsFirstLogin: (state, action: PayloadAction<boolean>) => {
      state.isFirstLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.verificationId = action.payload;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.token =  null;
        state.verificationId =  null;
        state.error = action.error.message as string;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.isFirstLogin = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<AuthStateTokenProps>) => {
        state.loading = false;
        state.isFirstLogin = false;
        state.token = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isFirstLogin = true;
        state.error = action.error.message as string;
        state.token = null;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action: PayloadAction<AuthStateTokenProps>) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.token = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.token = null;
        state.verificationId =  null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.token = null;
        state.verificationId =  null;
      });
  },
});

export const { setIsFirstLogin } = authSlice.actions;

export default authSlice.reducer;