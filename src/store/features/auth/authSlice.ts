import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sendOTP, createDriverAccount, verifyOTP, logout, refreshTokens } from '@services/useAuth';

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
  "verificationId"?: string | null;
  "error": string | null;
}


const initialState: AuthState = {
  "token": null,
  "loading": false,
  "error": null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
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
      .addCase(refreshTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshTokens.fulfilled, (state, action: PayloadAction<AuthStateTokenProps>) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
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
      })
      .addCase(createDriverAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDriverAccount.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading = false;
      })
      .addCase(createDriverAccount.rejected, (state, action) => {
        state.loading = false;
        state.token =  null;
        state.verificationId =  null;
        state.error = action.error.message as string;
      })
      ;
  },
});

export default authSlice.reducer;