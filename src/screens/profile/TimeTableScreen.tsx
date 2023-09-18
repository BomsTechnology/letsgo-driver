import React, { Component, useRef, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Alert,
} from 'react-native';
import { genTimeBlock } from '../../utils/utils';
import { TimetableView } from '@components/timetable/TimetableView';
import { TimetableEntry } from '@components/timetable/TimetableEntry';
import TimeEntryModal from '@components/timetable/TimetableModal';
import { SafeAreaView } from 'react-native-safe-area-context';

import SimpleHeader from '@components/SimpleHeader';

import Colors from '@constants/colors';


const events_data = [
	{
		day: 1,
		startTime: genTimeBlock("MON", 9),
		endTime: genTimeBlock("MON", 20, 50)
	},
	{
		day: 2,
		startTime: genTimeBlock("WED", 9),
		endTime: genTimeBlock("WED", 10, 50)
	},
	{
		day: 1,
		startTime: genTimeBlock("MON", 21),
		endTime: genTimeBlock("MON", 22)
	},
	{
		day: 4,
		startTime: genTimeBlock("WED", 11),
		endTime: genTimeBlock("WED", 11, 50)
	},
	{
		day: 3,
		startTime: genTimeBlock("TUE", 9),
		endTime: genTimeBlock("TUE", 10, 50)
	},
	{
		day: 3,
		startTime: genTimeBlock("FRI", 9),
		endTime: genTimeBlock("FRI", 10, 50)
	},
	{
		day: 5,
		startTime: genTimeBlock("THU", 9),
		endTime: genTimeBlock("THU", 10, 50)
	},
	{
		day: 4,
		startTime: genTimeBlock("FRI", 13, 30),
		endTime: genTimeBlock("FRI", 14, 50)
	},
];



const getRecap = (events_data: TimetableEntry[]) => {


	let sum = 0;
	for (let index = 0; index < events_data.length; index++) {
		const element = events_data[index];
		sum = sum + (element.endTime.getTime() - element.startTime.getTime())
	}

	return timeDistance(sum);

}


const timeDistance = (distance: number) => {
	const hours = Math.floor(distance / 3600000);
	distance -= hours * 3600000;
	const minutes = Math.floor(distance / 60000);
	return `${hours} h:${('0' + minutes).slice(-2)} min`;
};




const TimetableScreen: React.FC = () => {

	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [selectedEntry, setSelectedEntry] = useState<TimetableEntry>();


	const pivotDate = genTimeBlock('MON');
	const timetableRef = useRef()


	const scrollViewRef = (ref: any) => {
		timetableRef.current = ref;
	};

	const onEventPress = (evt: any) => {

		setSelectedEntry(evt);
		setModalVisible(true)
	};


	const sum = getRecap(events_data);


	return (
		<SafeAreaView style={{ flex: 1, paddingTop: 20 }}>

			<View style={{ paddingHorizontal: 20 }}>
				<SimpleHeader
					text="Driver TimeTable" 
				/>
			</View>
			  
			<TimeEntryModal entry={selectedEntry}
				setTimeTableEntry={setSelectedEntry}
				visible={modalVisible}
				setVisible={setModalVisible} />

			<View style={styles.container}>
				<View style={styles.recapContainer}>
					<Text style={{ fontWeight: "700", color: Colors.primaryColor }}>{sum}</Text>
					<Text> de travail par semaines.</Text>
				</View>
				<TimetableView
					scrollViewRef={scrollViewRef}
					entries={events_data}
					pivotTime={4}
					pivotEndTime={24}
					pivotDate={pivotDate}
					onEventPress={onEventPress}
					locale="en"
				/>
			</View>
		</SafeAreaView>
	);

};
	 



export default TimetableScreen;


const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: '#81E1B8'
	},
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: '#F8F8F8',
	},
	recapContainer: {

		padding: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	}

});

