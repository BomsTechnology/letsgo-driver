import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { RootState, useAppSelector } from "@store/store";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";

const PlanningScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const menuIcon = (
    <Ionicons name="menu" size={25} color={Colors.primaryColor} />
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  return (
    <SafeAreaView
      style={
        settingState.setting.isDarkMode
          ? styles.container_DARK
          : styles.container
      }
    >
      <SimpleHeader
      text="Driver Planning"
      LeftbuttonAction={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
      LeftbuttonIcon={menuIcon}
    />
    </SafeAreaView>
  );
};

export default PlanningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    padding: 20,
  },
});
