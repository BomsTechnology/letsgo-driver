import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '@constants/colors';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import DateTimePicker , { DateTimePickerEvent } from '@react-native-community/datetimepicker';
const { width, height } = Dimensions.get('window');
interface TimePickerProps {
  date: Date;
  setDate: Function;
  shadow?: boolean;
  bgColor?: string;
  marginHorizontal?: number;
  marginVertical?: number;
  error?: boolean
}



const TimePicker = (props: TimePickerProps) => {
  const [show, setShow] = useState(false);
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate! || Date;
      setShow(false);
      props.setDate(currentDate);
  }

return (
  <>
  
  <TouchableOpacity onPress={() => setShow(!show)} style={[
      styles.container,
      props.shadow != null && props.shadow ? styles.shadowProp : props.shadow != null && !props.shadow ? undefined : styles.shadowProp,
      styles.container_NORMAL,
      {
        backgroundColor: props.bgColor ? props.bgColor : undefined,
        marginVertical: props.marginVertical ? props.marginVertical : undefined
      }
    ]}>
      <View style={[styles.boxContainer]}>
          <View style={[styles.box]}>
            <Text style={[styles.text]}>{props.date.getHours().toString().length == 1 ? `0${props.date.getHours()}` : `${props.date.getHours()}`}</Text>
          </View>
          <Text style={[styles.desc]}>Hours</Text>
      </View>


        <Text style={[styles.text, {marginHorizontal: 10}]}>:</Text>

      <View style={[styles.boxContainer]}>
        <View style={[styles.box]}>
            <Text style={[styles.text]}>{props.date.getMinutes().toString().length == 1 ? `0${props.date.getMinutes()}` : `${props.date.getMinutes()}`}</Text>
        </View>
        <Text style={[styles.desc]}>Minutes</Text>
       </View>

  </TouchableOpacity>
  {show &&
      <DateTimePicker
          testID="dateTimePicker"
          value={props.date}
          mode='time'
          is24Hour={true}
          display='clock'
          onChange={onChange}
       />
  }
  {props.error && (
      <Text style={styles.text_ERROR}>Date is required</Text>
    )}
  </>
);
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.6,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 110,
  },
  shadowProp: {
    shadowColor: '#171717',
    elevation: 4,
    backgroundColor: Colors.whiteTone1,
    borderRadius: 10
  },
  container_NORMAL: {
    borderColor: Colors.grayTone4,
  },
  container_GOOD: {
    borderColor: Colors.primaryColor,
  },
  container_ERROR: {
    borderColor: 'red',
  },
  text: {
    color: Colors.grayTone1,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
  },
  desc: {
    fontSize: 12,
    fontFamily: 'Poppins_300Light',
    marginTop: 5
  },
  boxContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    height: '50%',
    width: width * 0.2,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_ERROR: {
    color: 'red',
    alignSelf: 'stretch',
  },
});