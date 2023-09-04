import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { RootState,  useAppSelector,  } from "@store/store";
interface SeatInputProps {
  nb: number;
  setNb: Function;
}

const SeatInput = ({ nb, setNb }: SeatInputProps) => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
    const add = () => {
        setNb(nb + 1);
    }

    const remove = () => {
       if (nb > 1) setNb(nb - 1);
    }
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 5,
        backgroundColor: settingState.setting.isDarkMode ? Colors.darkTone4  : Colors.whiteTone3,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        overflow: "hidden",
        alignItems: "stretch",
      }}
    >
      <View style={{ paddingLeft: 10, justifyContent: "center", alignItems: "center" }}>
      <Ionicons name="people-outline" size={18} color={settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone1} />
      </View>
      <View
        style={{ flexGrow: 1, justifyContent: "center", alignItems: "center", height: 48,}}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Poppins_300Light",
            fontSize: 13,
            color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone1,
          }}
        >
          {nb}
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: settingState.setting.isDarkMode ? Colors.darkTone2 :  Colors.whiteTone2,
        }}
      >
        <TouchableOpacity
        onPress={add}
          style={[
            styles.btn,
          ]}
        >
          <Ionicons name="chevron-up" size={18} color={settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone1} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={remove}
          style={[
            styles.btn,
          ]}
        >
          <Ionicons name="chevron-down" size={18} color={settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone1} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SeatInput;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
