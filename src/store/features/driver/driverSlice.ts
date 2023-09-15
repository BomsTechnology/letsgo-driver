import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Driver,
  DriverExperience,
  DriverSkill,
  HumanIdentity,
} from "@mytypes/TimeTableProps";
import {
  addOrUpdateDriverSkill,
  upgradeToDriver,
  getDriverInfo,
  removeDriverSkill,
  addOrUpdateDriverExperience,
  removeDriverExperience,
  addOrUpdateDriverLicence,
  removeDriverLicence,
} from "@services/useDriver";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface driverState {
  driver: Driver | null;
  loading: boolean;
  error: string | null;
}

const initialState: driverState = {
  loading: false,
  driver: null,
  error: null,
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDriverInfo: (state, action: PayloadAction<Driver>) => {
      state.driver = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeDriverLicence.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeDriverLicence.fulfilled,
        (state, action: PayloadAction<HumanIdentity[]>) => {
          state.loading = false;
          state.driver!.driverLicences = action.payload;
          AsyncStorage.setItem("driver", JSON.stringify(state.driver));
        }
      )
      .addCase(removeDriverLicence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addOrUpdateDriverLicence.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addOrUpdateDriverLicence.fulfilled,
        (state, action: PayloadAction<HumanIdentity[]>) => {
          state.loading = false;
          state.driver!.driverLicences = action.payload;
          AsyncStorage.setItem("driver", JSON.stringify(state.driver));
        }
      )
      .addCase(addOrUpdateDriverLicence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(removeDriverSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeDriverSkill.fulfilled,
        (state, action: PayloadAction<DriverSkill[]>) => {
          state.loading = false;
          state.driver!.skills = action.payload;
          AsyncStorage.setItem("driver", JSON.stringify(state.driver));
        }
      )
      .addCase(removeDriverSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addOrUpdateDriverSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addOrUpdateDriverSkill.fulfilled,
        (state, action: PayloadAction<DriverSkill[]>) => {
          state.loading = false;
          state.driver!.skills = action.payload;
          AsyncStorage.setItem("driver", JSON.stringify(state.driver));
        }
      )
      .addCase(addOrUpdateDriverSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(upgradeToDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        upgradeToDriver.fulfilled,
        (state, action: PayloadAction<Driver>) => {
          state.loading = false;
          state.driver = action.payload;
        }
      )
      .addCase(upgradeToDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getDriverInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDriverInfo.fulfilled,
        (state, action: PayloadAction<Driver>) => {
          state.loading = false;
          state.driver = action.payload;
        }
      )
      .addCase(getDriverInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addOrUpdateDriverExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addOrUpdateDriverExperience.fulfilled,
        (state, action: PayloadAction<DriverExperience[]>) => {
          state.loading = false;
          state.driver!.experiences = action.payload;
          AsyncStorage.setItem("driver", JSON.stringify(state.driver));
        }
      )
      .addCase(addOrUpdateDriverExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(removeDriverExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeDriverExperience.fulfilled,
        (state, action: PayloadAction<DriverExperience[]>) => {
          state.loading = false;
          state.driver!.experiences = action.payload;
          AsyncStorage.setItem("driver", JSON.stringify(state.driver));
        }
      )
      .addCase(removeDriverExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { setDriverInfo } = driverSlice.actions;
export default driverSlice.reducer;
