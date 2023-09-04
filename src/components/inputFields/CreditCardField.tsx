import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Control, Controller} from 'react-hook-form';
import { Divider } from '@constants/ComponentStyled';

interface CreditCardFieldProps {
    control: Control
}

const CreditCardField = ({control}: CreditCardFieldProps) => {
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Controller
        name='cardNumber'
        control={control}
        rules={
            {
                required: 'Card Number is required',
                minLength: {
                    value: 3,
                    message: 'Card Number should be least 3 characters long',
                },
            }
        }
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
                <View style={{ 
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                }}>
                    <View>
                        <Text style={[styles.fixText, {fontSize: 10, lineHeight: 10}]}>Card</Text>
                        <Text style={[styles.fixText, {fontSize: 10, lineHeight: 10}]}>Number</Text>
                    </View>
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder='000 0000 00000 000'
                        placeholderTextColor={Colors.grayTone2}
                        selectionColor={Colors.grayTone1}
                        keyboardType='numeric'
                        style={[styles.input, {width: '70%'}]}
                        />
                        <Image 
                            resizeMode='contain'  
                            source={require('@assets/images/visamastercard.jpg')} 
                            style={{ width: 40, height: 25 }} 
                            />
                </View>
            </>
        )}
        />
      <Divider/>
      <View style={{ 
                flexDirection: 'row',
                alignItems: 'center',
        }}
        >
        <Controller
        name='expireYear'
        control={control}
        rules={
            {
                required: 'Expire Year is required',
                minLength: {
                    value: 4,
                    message: 'Expire Year should be least 4 characters long',
                },
            }
        }
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
                <View style={{ 
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '50%',
                        borderRightWidth: 1,
                        paddingRight: 10,
                        borderRightColor: Colors.grayTone4
                }}>
                    <Text style={[styles.fixText]}>MM/YY</Text>
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder='00/00'
                        maxLength={5}
                        placeholderTextColor={Colors.grayTone2}
                        selectionColor={Colors.grayTone1}
                        style={[styles.input,]}
                        keyboardType='numeric'
                        />
                </View>
            </>
        )}
        />
        <Controller
        name='cvc'
        control={control}
        rules={
            {
                required: 'CVC is required',
                minLength: {
                    value: 3,
                    message: 'CVC should be least 3 characters long',
                },
            }
        }
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
                <View style={{ 
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '50%',
                        paddingLeft: 10
                }}>
                    <Text style={[styles.fixText]}>CVC</Text>
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder='000'
                        placeholderTextColor={Colors.grayTone2}
                        selectionColor={Colors.grayTone1}
                        keyboardType='numeric'
                        maxLength={3}
                        style={[styles.input,]}
                        />
                </View>
            </>
        )}
        />
      </View>
    </View>
  );
};

export default CreditCardField;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 10,
        padding: 10
    },
    shadowProp: {
        shadowColor: Colors.primaryColor,
        elevation: 5,
        backgroundColor: Colors.whiteTone1,
    },
    input: {
        width: '60%',
        textAlign: 'right',
        height: 40,
        color: Colors.grayTone1,
        fontFamily: 'Poppins_300Light',
        fontSize: 16,
    },
    fixText: {
        color: Colors.grayTone3,
        fontFamily: 'Poppins_300Light',
        fontSize: 16,
      },
});