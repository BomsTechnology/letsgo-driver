import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "@constants/colors";
import { RootState, useAppSelector } from "@store/store";

export interface deviceItemProps {
  id: string;
  deviceOs: string;
  name: string;
  isCurrent: boolean;
  loginMethod: string;
  country: string;
  state: string;
  lastLoggin: string;
}

const DeviceItem = ({
  props,
  closeAction,
  blockAction,
}: {
  props: deviceItemProps;
  closeAction : (item: deviceItemProps) => void;
  blockAction : (item: deviceItemProps) => void;
}) => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  return (
    <View
      style={[
        styles.deviceContainer,
        {
          borderColor: props.isCurrent
            ? Colors.primaryColor
            : !props.isCurrent && settingState.setting.isDarkMode
            ? Colors.grayTone1
            : Colors.grayTone3,
          backgroundColor: settingState.setting.isDarkMode
            ? Colors.darkTone4
            : Colors.whiteTone1,
        },
      ]}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.deviceOs == "IOS" ? (
          <Ionicons
            name="logo-apple"
            size={70}
            color={
              props.isCurrent && settingState.setting.isDarkMode
                ? Colors.onPrimaryColor
                : props.isCurrent && !settingState.setting.isDarkMode
                ? Colors.primaryColor
                : !props.isCurrent && settingState.setting.isDarkMode
                ? Colors.onPrimaryColor
                : Colors.grayTone1
            }
          />
        ) : props.deviceOs == "ANDROID" ? (
          <Ionicons
            name="logo-android"
            size={70}
            color={
              props.isCurrent && settingState.setting.isDarkMode
                ? Colors.onPrimaryColor
                : props.isCurrent && !settingState.setting.isDarkMode
                ? Colors.primaryColor
                : !props.isCurrent && settingState.setting.isDarkMode
                ? Colors.onPrimaryColor
                : Colors.grayTone1
            }
          />
        ) : (
          <Ionicons
            name="earth"
            size={70}
            color={
              props.isCurrent && settingState.setting.isDarkMode
                ? Colors.onPrimaryColor
                : props.isCurrent && !settingState.setting.isDarkMode
                ? Colors.primaryColor
                : !props.isCurrent && settingState.setting.isDarkMode
                ? Colors.onPrimaryColor
                : Colors.grayTone1
            }
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={
            settingState.setting.isDarkMode
              ? styles.deviceName_DARK
              : styles.deviceName
          }
        >
          {props.name}
        </Text>
        <Text
          style={
            settingState.setting.isDarkMode
              ? styles.deviceMinText_DARK
              : styles.deviceMinText
          }
        >
          {props.loginMethod}
        </Text>
        <Text
          style={
            settingState.setting.isDarkMode
              ? styles.deviceMinText_DARK
              : styles.deviceMinText
          }
        >
          {props.country} - {props.state}
        </Text>
        <Text
          style={
            settingState.setting.isDarkMode
              ? styles.deviceMinText_DARK
              : styles.deviceMinText
          }
        >
          {props.lastLoggin}
        </Text>
      </View>
      {!props.isCurrent && (
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
        >
          <TouchableOpacity
            style={styles.centerCtn}
            onPress={() => blockAction(props)}
          >
            <FontAwesome5 name="ban" size={17} color={Colors.accentOrange} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.centerCtn}
            onPress={() => closeAction(props)}
          >
            <Ionicons name="trash" size={20} color={Colors.secondaryColor} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DeviceItem;

const styles = StyleSheet.create({
  deviceContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    gap: 5,
    width: "100%",
    height: 120,
  },
  deviceMinText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: Colors.grayTone2,
  },
  deviceMinText_DARK: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: Colors.grayTone4,
  },
  deviceName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: Colors.grayTone1,
  },
  deviceName_DARK: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: Colors.onPrimaryColor,
  },
  centerCtn: {
    justifyContent: "center",
    alignItems: "center",
  },
});
