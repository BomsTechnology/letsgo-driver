import {
  StyleSheet,
  Text,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import Colors from "@constants/colors";
import LoadingButton from "./LoadingButton";
import { RootState,  useAppSelector,  } from "@store/store";
interface CustomButtonProps {
  text: string;
  bgColor: string;
  fgColor: string;
  isReady: boolean;
  onPress: (event: GestureResponderEvent) => void;
  marginHorizontal?: number;
  marginVertical?: number;
  radius?: number;
  fontSize?: number;
  icon?: JSX.Element;
  loading?: boolean;
}

const CustomButton = (props: CustomButtonProps) => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  return (
    <>
      {props.loading == true ? (
        <LoadingButton />
      ) : (
        <Pressable
          onPress={props.onPress}
          disabled={!props.isReady}
          style={[
            styles.container,
            {
              backgroundColor: props.isReady
                ? props.bgColor
                : settingState.setting.isDarkMode ? Colors.darkTone4 : Colors.whiteTone3,
              marginVertical: props.marginVertical
                ? props.marginVertical
                : undefined,
              borderRadius: props.radius ? props.radius : 5,
            },
          ]}
        >
          {props.icon && props.icon}
          <Text
          numberOfLines={1}
            style={[
              styles.text,
              {
                color: props.isReady ? props.fgColor : settingState.setting.isDarkMode ? Colors.grayTone2 : Colors.grayTone3,
                fontSize: props.fontSize ? props.fontSize : undefined,
              },
            ]}
          >
            {props.text}
          </Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
    justifyContent: "center",
  },

  text: {
    fontWeight: "bold",
    fontFamily: "Poppins_500Medium",
    textTransform: "uppercase",
    letterSpacing: 3,
  },
});

export default CustomButton;
