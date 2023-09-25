import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import { ActivityIndicator, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStackNavigator from "@navigators/AppStackNavigator";
import AuthStackNavigator from "@navigators/AuthStackNavigator";
import { RootState, useAppSelector, useAppDispatch } from "@store/store";
import { checkAuth } from "@services/useAuth";
import { showError, showSuccess } from "@functions/helperFunctions";
import Colors from "@constants/colors";
import { getLocalSetting } from "@services/useSetting";
import SettingProps from "../types/SettingProps";
//import i18n from '../locales/i18n'
import { countryCodeProps } from "@data/CountryCode";
import { TaskProps } from "../types/TaskProps";

export type AppStackParamList = {
  Home: undefined;
  OnBoarding: undefined;
  Skills: undefined;
  Experience: undefined;
  TimeTable: undefined;
  IdentityPiece: undefined;
  PersonnalInformation: undefined;
  BusinessInformation: undefined;
  Syndicat: undefined;
  TimetableScreen: undefined;
  ChatScreen: undefined;
  AddUpdateTaskScreen: {
    task?: TaskProps
  };
  ViewTaskScreen: {
    task: TaskProps
  };

  Login: { countryCode?: countryCodeProps, phoneNumber?: string };
  OTP: { countryCode: countryCodeProps, phoneNumber: string };
};


const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const authState = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [isLoggin, setIsLoggin] = useState(false);
  const [setting, setSetting] = useState<SettingProps | null>(null);
  const checkIsAuth = async () => {
    setLoading(true);
    const setg = await getLocalSetting();
    //i18n.locale = setg.language;
    setSetting(setg);
    await dispatch(checkAuth(setg))
      .unwrap()
      .then(async (data) => {
        setIsLoggin(true)
        setLoading(false);
        showSuccess(`Hello Driver`);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    checkIsAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: setting && setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2 }}>
        <ActivityIndicator size={"large"} color={setting && setting.isDarkMode ? Colors.secondaryColor : Colors.primaryColor} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          {isLoggin || authState.token?.access_token
            ? AppStackNavigator(Stack)
            : AuthStackNavigator(Stack)}
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
