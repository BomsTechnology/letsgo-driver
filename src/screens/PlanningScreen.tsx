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
	const [selected, setSelected] = useState<string>(currentDate);


	const refreshTasks = useAppSelector((state: RootState) => state.task);


	const [tasks, setTasks] = useState<{ [key: string]: TaskProps[] }>({});


	const refreshTaskList = () => {

		retrieveTasks()
			.then((tks) => {

				setTasks(groupByDate(tks));
			})

	}


	useEffect(() => {

		refreshTaskList();

	}, [refreshTasks])




	const groupByDate = (tasks: TaskProps[]) => {

		const groups = tasks.reduce<{ [key: string]: TaskProps[] }>((groups, task) => {

			const date = task.fromDate;
			if (!groups[date as string]) {
				groups[date as string] = [];
			}
			groups[date as string].push(task);
			return groups;
		}, {});

		return groups;
	}





	const renderItemTaskInfo = (value: ListRenderItemInfo<TaskProps>) => (
		<TouchableOpacity
			onLongPress={() => navigation.navigate("ViewTaskScreen", { task: value.item })}
			onPress={() => navigation.navigate("ViewTaskScreen", { task: value.item })}>
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
			<View style={{ paddingHorizontal: 20 }}>
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
				data={tasks[selected] && tasks[selected].sort((a, b) => {

					if (a.fromHour > b.fromHour) {
						return 1;
					}
					else {

						return -1;
					}

				})} renderItem={renderItemTaskInfo}>
			</FlatList>

			<FAB
				icon="plus"
				style={styles.fab}
				color={Colors.secondaryColor}
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
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 50,
		borderRadius: 9999,
		backgroundColor: Colors.primaryColor,
		color: Colors.onPrimaryColor,
	  },

});





