import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setThemeMode, setLanguage } from "@services/useSetting";
import SettingProps from "../../../types/SettingProps";

export interface SettingState {
  setting: SettingProps;
  loading: boolean;
  error: string | null;
}

const initialState: SettingState = {
  setting: {
    isDarkMode: false,
    language: "en",
  },
  loading: false,
  error: null
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<SettingProps>) => {
      state.setting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setThemeMode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setThemeMode.fulfilled,
        (state, action: PayloadAction<SettingProps>) => {
          state.loading = false;
          state.setting = action.payload;
        }
      )
      .addCase(setThemeMode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(setLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setLanguage.fulfilled,
        (state, action: PayloadAction<SettingProps>) => {
          state.loading = false;
          state.setting = action.payload;
        }
      )
      .addCase(setLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
  },
});

export const { setSetting } = settingSlice.actions;
export default settingSlice.reducer;
