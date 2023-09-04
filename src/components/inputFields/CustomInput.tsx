import {KeyboardTypeOptions, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Control, Controller} from 'react-hook-form';
import Colors from '@constants/colors';
import { RootState,  useAppSelector,  } from "@store/store";

interface CustomInputProps {
    control: Control;
    name: string;
    placeholder: string;
    secureTextEntry?: boolean;
    rules?: Object;
    prefixType?: string;
    prefix?: JSX.Element | string;
    sufixType?: string;
    sufix?: JSX.Element | string;
    keyboardType?:  KeyboardTypeOptions;
    shadow?: boolean;
    bgColor?: string;
    marginHorizontal?: number;
    marginVertical?: number;
    fontSize?: number;
  }

const CustomInput = (props: CustomInputProps) => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              props.shadow != null && props.shadow ? styles.shadowProp : props.shadow != null && !props.shadow ? undefined : styles.shadowProp,
              error ? styles.container_ERROR : value  ? styles.container_GOOD : styles.container_NORMAL,
              {
                backgroundColor: props.bgColor ? props.bgColor : undefined,
                marginVertical: props.marginVertical ? props.marginVertical : undefined
              }
            ]}>
            {(props.prefixType == 'icon' && props.prefix ) && (
              <View
                style={[
                  styles.iconStyle,
                  {marginRight: 5}
                ]}>
                  {props.prefix}
              </View>
            )}
            {(props.prefixType == 'text' && props.prefix ) && (
              <View
                style={[
                  {marginRight: 5}
                ]}>
                  <Text style={[
                    styles.fixText,
                    {fontSize: props.fontSize ? props.fontSize : undefined,}
                    ]}>{props.prefix}</Text> 
              </View>
            )} 
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor={Colors.grayTone2}
                placeholder={props.placeholder}
                style={[
                  settingState.setting.isDarkMode ? styles.input_DARK : styles.input,
                  {fontSize: props.fontSize ? props.fontSize : undefined,}
                ]}
                secureTextEntry={props.secureTextEntry}
                keyboardType={!props.keyboardType ? "default" : props.keyboardType}
              />
              
            {(props.sufixType == 'icon' && props.sufix )&& (
              <View
                  style={[
                    styles.iconStyle,
                    {marginLeft: 5}
                  ]}>   
                  {props.sufix}        
              </View>
            )} 
            {(props.sufixType == 'text' && props.sufix )&& (
              <View
                  style={[
                    {marginLeft: 5}
                  ]}>  
                  <Text style={[
                    styles.fixText,
                    {fontSize: props.fontSize ? props.fontSize : undefined,}
                    ]}>{props.sufix}</Text>         
              </View>
            )} 
          </View>
      {error && (
            <Text style={styles.text_ERROR}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 10,
      height: 50,
    },
    shadowProp: {
      shadowColor: '#171717',
      elevation: 4,
      backgroundColor: Colors.whiteTone1,
      borderRadius: 10
    },
    container_NORMAL: {
      borderColor: Colors.whiteTone1,
    },
    container_GOOD: {
      borderColor: Colors.primaryColor,
    },
    container_ERROR: {
      borderColor: 'red',
    },
    input: {
      flex:1,
      height: 50,
      color: Colors.grayTone1,
      fontFamily: 'Poppins_300Light',
      fontSize: 16,
    },
    input_DARK: {
      flex:1,
      height: 50,
      color: Colors.onPrimaryColor,
      fontFamily: 'Poppins_300Light',
      fontSize: 16,
    },
    iconStyle: {
      height: 30,
      width: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    fixText: {
      color: Colors.grayTone3,
      fontFamily: 'Poppins_300Light',
      fontSize: 16,
    },
    text_ERROR: {
      color: 'red',
      alignSelf: 'stretch',
    },
  });