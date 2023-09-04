import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Checkbox from 'expo-checkbox';
import Colors from '@constants/colors';

interface CheckboxFieldProps {
    text: string;
    isChecked: boolean;
    size?: number;
    setChecked: (value: boolean) => void;
}

const CheckboxField = ({text, isChecked, setChecked, size}: CheckboxFieldProps) => {
  return (
    <TouchableOpacity
        onPress={() => setChecked(!isChecked)}
        style={styles.container}
        >
        <Checkbox
        style={{
            width: size ? size : 15,
            height: size ? size : 15,
        }}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? Colors.primaryColor : undefined}
        />
        <Text style={[styles.description]}>
        {text}
        </Text>
    </TouchableOpacity>
  );
};

export default CheckboxField;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    description: {
        fontFamily: 'Poppins_300Light',
        textAlign: 'left',
        color: Colors.grayTone1,
        marginLeft: 15,
        fontSize: 14, 
    },
});