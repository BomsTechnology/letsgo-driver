import "react-native-gesture-handler";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_700Bold,
  Poppins_900Black,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import React from "react";
import AppNavigator from "@navigators/AppNavigator";
import { View, useColorScheme } from "react-native";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "@store/store";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
      <FlashMessage position="bottom" />
    </View>
  );
}