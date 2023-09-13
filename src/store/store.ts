import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import settingReducer from './features/setting/settingSlice';
import driverReducer from './features/driver/driverSlice';


export const store = configureStore({
  reducer: {
      auth: authReducer,
      driver: driverReducer,
      setting: settingReducer,
  },
 /* middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  },*/
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
