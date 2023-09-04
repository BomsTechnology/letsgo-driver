import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SelectList, SelectListProps } from "react-native-dropdown-select-list";
import Colors from "@constants/colors";
import { RootState,  useAppSelector,  } from "@store/store";

export interface DropDataProps {
  key: string | number;
  value: string;
  disabled?: boolean;
}

interface CustomDropdownInputProps {
  data: DropDataProps[];
  setSelected: Function;
  placeholder: string;
  defaultOption?: DropDataProps;
  search?: boolean;
  asError?: boolean;
  errorMessage?: string;
}

const CustomDropdownInput = (props: CustomDropdownInputProps) => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  return (
    <>
      <View style={[ settingState.setting.isDarkMode ? styles.container_DARK : styles.container, styles.shadowProp]}>
        <SelectList
          setSelected={props.setSelected}
          data={props.data}
          save="value"
          defaultOption={props.defaultOption}
          placeholder={props.placeholder}
          search={props.search}
          fontFamily="Poppins_500Medium"
          boxStyles={{
            borderWidth: props.asError ? 1 : 0,
            borderBottomWidth: 2,
            height: 50,
            borderColor: props.asError ? "red" : Colors.primaryColor,
          }}
          inputStyles={{
            color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone2
          }}
          dropdownStyles={{
            borderColor: props.asError ? "red" : Colors.primaryColor,
          }}
          dropdownItemStyles={{
            borderBottomWidth: 0.25,
            borderColor: Colors.grayTone4,
            marginHorizontal: 5,
          }}
          dropdownTextStyles={{
            color:  settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone2,
          }}
        />
      </View>
      {props.asError && (
        <Text style={styles.text_ERROR}>{props.errorMessage || "Error"}</Text>
      )}
    </>
  );
};

export default CustomDropdownInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
    backgroundColor: Colors.whiteTone2,
  },
  container_DARK: {
    marginVertical: 10,
    width: "100%",
    backgroundColor: Colors.darkTone2,
  },
  shadowProp: {
    shadowColor: "#171717",
    elevation: 4,
    borderRadius: 10,
  },
  text_ERROR: {
    color: "red",
    alignSelf: "stretch",
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    margin: 5,
  },
});
