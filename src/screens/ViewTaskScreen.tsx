import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState, useAppSelector } from '@store/store';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@constants/colors';
import { AppStackParamList } from '@navigators/AppNavigator';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import AlertDriver, { AlertDriverProps } from '@components/cards/AlertDriver';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleHeader from '@components/SimpleHeader';



import CustomButton from "@components/buttons/CustomButton";


import DatePicker from "@components/inputFields/DatePicker";
import CustomDropdownInput, {
	DropDataProps,
} from "@components/inputFields/CustomDropdownInput";
import TimePicker from '@components/inputFields/TimePicker';
import CustomInput from '@components/inputFields/CustomInput';
import { TaskProps, TaskType } from '../types/TaskProps';
import { createTask } from '@services/usePlanning';
import { savePlanningEntity } from '../cache/index';




type ViewTaskScreenProps = NativeStackScreenProps<AppStackParamList, "ViewTaskScreen">


const ViewTaskScreen: React.FC<ViewTaskScreenProps> = ({ route, navigation }) => {

	const settingState = useAppSelector((state: RootState) => state.setting);

	const task = route.params.task;


	const [startTime, setStartTime] = useState<Date>(new Date());
	const [endTime, setEndTime] = useState<Date>(new Date());

	const [taskType, setTaskType] = useState<TaskType>(task.type!);

	useEffect(() => {

		console.log(task)

	}, [task])


	const [asError, setAsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [defaultGender, setDefaultGender] = useState<DropDataProps | undefined>(undefined);


	const taskTypeData: DropDataProps[] = [
		{ key: "1", value: "COURSE" },
		{ key: "3", value: "DEPOT" },
		{ key: "4", value: "OTHER" },
	];


	const priorityData: DropDataProps[] = [
		{ key: "1", value: "NORMAL" },
		{ key: "2", value: "URGENT" },
	];

	const handleSubmit = () => {
		let isValid = true;


		if (isValid) {
			//setErrors({});
			console.log('validééééé');

			createTask(task)
				.then(savePlanningEntity)
				.then((task) => {

					navigation.replace("ViewTaskScreen", { task: task });

				})
				.catch((err) => {

					console.log(err)
				})

		}


	};



	const [advencedVisible, setAdvencedVisible] = useState<boolean>(false);





	return (
		<SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>

			<View style={{ paddingHorizontal: 20 }}>
				<SimpleHeader
					text={"Task Details"}
				/>
			</View>

			<ScrollView
				style={[settingState.setting.isDarkMode ? styles.contentScroll_DARK : styles.contentScroll]}
				showsVerticalScrollIndicator={false}
			>

				<Text style={[settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText, { marginTop: 10 }]}>From Date</Text>

				<Text 
					style={{ width: "100%", marginVertical: 10, borderColor: Colors.primaryColor, borderRadius: 7, borderWidth: 0.5, padding: 10, }}
				>

					{task.fromDate?.toLocaleDateString()}

				</Text>

				<Text style={[settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText, { marginTop: 10 }]}>To Date</Text>


				<Text 
					style={{ width: "100%", marginVertical: 10, borderColor: Colors.primaryColor, borderRadius: 7, borderWidth: 0.5, padding: 10, }}
				>

					{task.toDate?.toLocaleDateString()}

				</Text>

				<Text style={{ marginTop: 20, marginBottom: 10, fontWeight: "700" }}>Heure De Debut </Text>
				<TimePicker bgColor='white' date={startTime} setDate={setStartTime} />

				<Text style={{ marginTop: 20, marginBottom: 10, fontWeight: "700" }}>Heure De Fin </Text>
				<TimePicker bgColor='white' date={endTime} setDate={setEndTime} />

				<Text style={[settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText, { marginTop: 10 }]}>Task Type</Text>

				<CustomDropdownInput
					placeholder="Select type"
					data={taskTypeData}
					setSelected={setTaskType}
					search={false}
					asError={asError}
					errorMessage={errorMessage}
					defaultOption={defaultGender}
				/>

				<Text style={settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText}>Note</Text>

				<Text 
					style={{ width: "100%", marginVertical: 10, borderColor: Colors.primaryColor, borderRadius: 7, borderWidth: 0.5, padding: 10, }}
				>

					{task.note}

				</Text>

				<TouchableOpacity style={{ zIndex: 50, borderBottomWidth: 3, borderBottomColor: "orange", marginTop: 20, marginBottom: 5, flexDirection: "row", alignItems: "center", paddingBottom: 1 }}
					onPress={() => setAdvencedVisible(!advencedVisible)}
				>
					<Text style={{ fontWeight: "700", fontSize: 15 }}>Advanced</Text>

					<Ionicons name="add" size={30} color={"orange"} />
				</TouchableOpacity>


				<View style={{ paddingVertical: 20 }}>

					<Text style={settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText}>From Location</Text>

					<TextInput
						numberOfLines={1}
						style={{ width: "100%", borderColor: Colors.primaryColor, marginVertical: 10, borderRadius: 15, borderWidth: 0.5, padding: 10, }}
						placeholder="Enter from location"
					/>

					<Text style={settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText}>To Location</Text>

					<TextInput
						numberOfLines={1}
						style={{ width: "100%", borderColor: Colors.primaryColor, marginVertical: 10, borderRadius: 15, borderWidth: 0.5, padding: 10, }}
						placeholder="Enter to location"
					/>

					<Text style={settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText}>Priority</Text>

				</View>


				<CustomButton
					bgColor={Colors.primaryColor}
					fgColor="#fff"
					isReady={true}
					onPress={(ev) => handleSubmit()}
					marginVertical={30}
					text={"create task"}
					loading={false}
				/>

			</ScrollView>


		</SafeAreaView>
	)
}

export default ViewTaskScreen;



const styles = StyleSheet.create({
	blockItem: {
		position: 'relative',
		width: '100%',
		marginTop: 10,
		borderRadius: 10,
	},
	container: {
		flex: 1,
		backgroundColor: Colors.whiteTone3,
		paddingTop: 20,
	},
	container_DARK: {
		flex: 1,
		backgroundColor: Colors.darkTone1,
		paddingTop: 20,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 120 / 2,
		borderWidth: 0.5,
		borderColor: Colors.grayTone4,
		backgroundColor: Colors.whiteTone1,
	},
	contentScroll: {
		flex: 1,
		paddingHorizontal: 30,
		paddingVertical: 20,
		position: "relative",
		marginTop: 10,
		marginBottom: 20,
		backgroundColor: Colors.whiteTone1,
	},
	contentScroll_DARK: {
		flex: 1,
		paddingHorizontal: 30,
		paddingVertical: 20,
		position: "relative",
		marginTop: 10,
		marginBottom: 20,
		backgroundColor: Colors.darkTone1,
	},
	semiBoldText: {
		fontSize: 14,
		fontFamily: "Poppins_500Medium",
		color: Colors.onWhiteTone,
	},
	semiBoldText_DARK: {
		fontSize: 14,
		fontFamily: "Poppins_500Medium",
		color: Colors.onPrimaryColor,
	},
	lightText: {
		fontSize: 12,
		fontFamily: "Poppins_300Light",
		color: Colors.grayTone2,
	},
	lightText_DARK: {
		fontSize: 12,
		fontFamily: "Poppins_300Light",
		color: Colors.grayTone2,
	},
	actionBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		backgroundColor: Colors.whiteTone1,
		elevation: 2,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
	},
	actionBtn_DARK: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		backgroundColor: Colors.darkTone2,
		elevation: 2,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
	}
});
