import { StyleSheet, GestureResponderEvent, View, Pressable } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import { RootState, useAppSelector,  } from "@store/store";

interface IconButtonProps {
  icon: JSX.Element;
  bgColor?: string;
  shadow?: boolean;
  isReady?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  padding?: number
}

const IconButton = ({icon, bgColor, shadow, isReady, onPress, padding }: IconButtonProps) => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  return (
    <View style={styles.container}>
        <Pressable disabled={(isReady != null) ? isReady : false} onPress={onPress} style={[
         (shadow != null && shadow == false) ? null : styles.shadowProp, 
          {padding: padding != null ? padding : 6},
          {backgroundColor: bgColor ? bgColor : settingState.setting.isDarkMode ? Colors.darkTone4 : Colors.whiteTone2},
          ]}>
          {icon}
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 10
    },
    shadowProp: {
        shadowColor: '#171717',
        elevation: 4,
        borderRadius: 10
      },
});

export default IconButton;