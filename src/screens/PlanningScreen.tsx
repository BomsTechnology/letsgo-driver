import React, { useEffect, useMemo, useState } from "react";
import Colors from "@constants/colors";
import { RootState, useAppSelector } from "@store/store";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import SimpleHeader from "@components/SimpleHeader";

import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, ListRenderItem, ListRenderItemInfo, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarProvider, CalendarUtils, ExpandableCalendar, LocaleConfig } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';
import { FAB } from 'react-native-paper';
import Task from '../components/Task';
import { TaskProps } from "../types/TaskProps";

import { retrieveTasks } from "../cache/index";


//import { useNavigation } from '@react-navigation/native';


const PlanningScreen: React.FC = () => {

	const today = new Date();
	const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

	const currentDate = getDate();
	const [selected, setSelected] = useState(currentDate);

	
	const [tasks, setTasks] = useState<TaskProps[]>(); 


	const refreshTaskList = ()=> {

		retrieveTasks()
		.then(setTasks)
	}


	useEffect(() => {

		refreshTaskList()

	}, [])


	const tasksByDate = { "": tasks }



	const renderItemTaskInfo = (value: ListRenderItemInfo<TaskProps>) => (
		<TouchableOpacity onPress={() => navigation.navigate("ViewTaskScreen", { task: value.item })}>
			<Task {...value.item} />
		</TouchableOpacity>
	);

	const marked = useMemo(() => {
		return {
			[currentDate]: {
				dotColor: Colors.primaryColor,
				marked: true
			},
			[selected]: {
				selected: true,
				disableTouchEvent: true,
				selectedColor: Colors.primaryColor,
				selectedTextColor: 'white'
			}
		};
	}, [selected]);

	const settingState = useAppSelector((state: RootState) => state.setting);
	const menuIcon = (
		<Ionicons name="menu" size={25} color={Colors.primaryColor} />
	);


	const navigation =
		useNavigation<NativeStackNavigationProp<AppStackParamList>>();


	return (
		<SafeAreaView
			style={
				settingState.setting.isDarkMode
					? styles.container_DARK
					: styles.container
			}
		>
			<View style={{paddingHorizontal: 20}}>
				<SimpleHeader
					text="Driver Planning"
					LeftbuttonAction={() => {
						navigation.dispatch(DrawerActions.toggleDrawer());
					}}
					LeftbuttonIcon={menuIcon}
				/>
			</View>

			<View style={styles.calendarContainer}>


				<Calendar
					style={{
						borderRadius: 5,
					}}

					initialDate={currentDate}
					minDate="2023-09-4"
					disableAllTouchEventsForDisabledDays={true}

					firstDay={1}
					markedDates={marked}

					onDayPress={(day) => setSelected(day.dateString)}
					onDayLongPress={(day) => console.log('onDayLongPress', day)}
					onMonthChange={(date) => console.log('onMonthChange', date)}
					onPressArrowLeft={(goToPreviousMonth) => {
						console.log('onPressArrowLeft'); goToPreviousMonth();
					}}
					onPressArrowRight={(goToNextMonth) => {
						console.log('onPressArrowRight'); goToNextMonth();
					}}
				/>


			</View>


			<FlatList
				contentContainerStyle={styles.taskContainer}
				data={tasks} renderItem={renderItemTaskInfo}>
			</FlatList>

			<FAB
				icon="plus"
				style={styles.fab}
				onPress={() => navigation.navigate("AddUpdateTaskScreen", {})}
			/>




		</SafeAreaView>
	);
};







export default PlanningScreen;

const styles = StyleSheet.create({
	container_DARK: {
		flex: 1,
		width: "100%",
		height: "100%",
		flexDirection: 'column',
		justifyContent: "center",
		paddingTop: 60,
		backgroundColor: Colors.darkTone1,
	},
	container: {
		width: "100%",
		height: "100%",
		flex: 1,
		backgroundColor: Colors.whiteTone1,
		flexDirection: 'column',
		justifyContent: "center",
		paddingTop: 60,
	},
	calendarContainer: {
		width: "100%",
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'center',
		marginBottom: 10,
		padding: 1,
	},
	taskContainer: {
		width: "100%",
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingBottom: 150,
	},

	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 50,
		backgroundColor: Colors.primaryColor
	},

});





