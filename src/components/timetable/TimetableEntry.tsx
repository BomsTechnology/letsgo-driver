import Colors from '@constants/colors';
import React from 'react'; 
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { StyleSheet } from 'react-native';



export type TimetableEntry = {

  day?: number,
  startTime: Date,
  endTime: Date

}

export type TimetableEntryProp = {

  onPress?: (entry: TimetableEntry) => void,
  entry: TimetableEntry,
  style?: any
}


export const timeDistance = (date1: Date, date2: Date) => {
  let distance = Math.abs(date1.getTime() - date2.getTime());
  const hours = Math.floor(distance / 3600000);
  distance -= hours * 3600000;
  const minutes = Math.floor(distance / 60000); 
  return `${hours}:${('0' + minutes).slice(-2)}`;
};


 const getRecap = (event_data: TimetableEntry) => {

  //return hour + "H" + min +  "min";
  return timeDistance(event_data.endTime, event_data.startTime)
}



const TimetableEntryView: React.FC<TimetableEntryProp> = ({ entry, onPress, style }) => {

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(entry!)}
      style={[styles.item, style, {
        backgroundColor: Colors.primaryColor,
      }]}
    >
      <Text style={styles.title}>{getRecap(entry)}</Text> 
    </TouchableOpacity>
  );
};







const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: "center",
    position: 'absolute',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 7,
    flex: 1,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: "700",
    alignItems: 'center',
    justifyContent: "center",
    fontSize: 13,
    //transform: [{ rotate: '90deg'}]
    
  },
  description: {
    color: '#777',
    textAlign: 'left',
    fontSize: 9,
  },

});



export default TimetableEntryView;