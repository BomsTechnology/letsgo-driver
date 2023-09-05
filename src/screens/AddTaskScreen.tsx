import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState, useAppSelector } from '@store/store';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@constants/colors';
import { AppStackParamList } from '@navigators/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import AlertDriver, { AlertDriverProps } from '@components/cards/AlertDriver';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleHeader from '@components/SimpleHeader';



import CustomButton from "@components/buttons/CustomButton";
import { useForm } from "react-hook-form";
//import { ScrollView } from "react-native-gesture-handler";

import DatePicker from "@components/inputFields/DatePicker";
import CustomDropdownInput, {
	DropDataProps,
} from "@components/inputFields/CustomDropdownInput";
import TimePicker from '@components/inputFields/TimePicker';
import CustomInput from '@components/inputFields/CustomInput';



const AddTaskScreen: React.FC = () => {

	const settingState = useAppSelector((state: RootState) => state.setting);
	const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();



	const [asError, setAsError] = useState(false);
	const [birthdate, setBirthdate] = useState(new Date());
	const [errorMessage, setErrorMessage] = useState("");
	const [defaultGender, setDefaultGender] = useState<DropDataProps | undefined>(undefined);
	const [selected, setSelected] = useState("");


	const genderData: DropDataProps[] = [
		{ key: "1", value: "COURSE" },
		{ key: "2", value: "COLLECT" },
		{ key: "3", value: "DEPOT" },
		{ key: "4", value: "OTHER" },
	];

	const priorityData: DropDataProps[] = [
		{ key: "1", value: "NORMAL" },
		{ key: "2", value: "URGENT" },
	];


	const [startTime, setStartTime] = useState<Date>(new Date());
	const [endTime, setEndTime] = useState<Date>(new Date());


	const [advencedVisible, setAdvencedVisible] = useState<boolean>(false);







	const aletrs: AlertDriverProps[] = [
		{
			id: '1',
			title: 'Marcelin Sigha',
			description: 'Make the experience of making around the city easier, faster and alfordable',
			image: require("@assets/images/avatars/Avatar5.png"),
			type: "INFO",
		},
		{
			id: '2',
			title: 'Letsgo',
			description: 'Take the control over your trips costs and access whenever you need to your data',
			type: "WARNING",
			image: require("@assets/images/logo.png"),
		},
		{
			id: '3',
			title: 'New Transaction',
			description: 'Share your trips with people doing same road and get exclusive discounts(even free trips)',
			type: "GOOD",
		},
	];


	return (
		<SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>


			<View style={{ paddingHorizontal: 20 }}>
				<SimpleHeader
					text="Add Planning"
				/>
			</View>

			<ScrollView
				style={[settingState.setting.isDarkMode ? styles.contentScroll_DARK : styles.contentScroll]}
				showsVerticalScrollIndicator={false}
			>

				<Text style={[settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText, { marginTop: 10 }]}>From Date</Text>

				<DatePicker
					date={birthdate}
					setDate={setBirthdate}
					bgColor={settingState.setting.isDarkMode ? Colors.darkTone2 : Colors.whiteTone1}
				/>

				<Text style={[settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText, { marginTop: 10 }]}>To Date</Text>

				<DatePicker
					date={birthdate}
					setDate={setBirthdate}
					bgColor={settingState.setting.isDarkMode ? Colors.darkTone2 : Colors.whiteTone1}
				/>

				<Text style={{ marginTop: 20, marginBottom: 10, fontWeight: "700" }}>Heure De Debut </Text>
				<TimePicker bgColor='white' date={startTime!} setDate={setStartTime} />
				
				<Text style={{ marginTop: 20, marginBottom: 10, fontWeight: "700" }}>Heure De Fin </Text>
				<TimePicker bgColor='white' date={endTime!} setDate={setEndTime} />

				<Text style={[settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText, { marginTop: 10 }]}>Task Type</Text>

				<CustomDropdownInput
					placeholder="Select type"
					data={genderData}
					setSelected={setSelected}
					search={false}
					asError={asError}
					errorMessage={errorMessage}
					defaultOption={defaultGender}
				/>

				<Text style={settingState.setting.isDarkMode ? styles.semiBoldText_DARK : styles.semiBoldText}>Note</Text>

				<TextInput
					numberOfLines={1}
					style={{ width: "100%", marginVertical: 10, borderColor: Colors.primaryColor, borderRadius: 7, borderWidth: 0.5, padding: 10, }}
							
					placeholder="Enter your note"
				/>

				<TouchableOpacity style={{ zIndex: 50, borderBottomWidth:3, borderBottomColor: "orange", marginTop: 20, marginBottom: 5, flexDirection: "row", alignItems: "center", paddingBottom: 1 }}
					onPress={() => setAdvencedVisible(!advencedVisible)}
				>
					<Text style={{ fontWeight: "700", fontSize: 15 }}>Advanced</Text>

					<Ionicons name="add" size={30} color={"orange"} />
				</TouchableOpacity>



				{advencedVisible &&

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

						<CustomDropdownInput
							placeholder="Select type"
							data={priorityData}
							setSelected={setSelected}
							search={false}
							asError={asError}
							errorMessage={errorMessage}
							defaultOption={defaultGender}
						/>

					</View>
				}



				<CustomButton
					bgColor={Colors.primaryColor}
					fgColor="#fff"
					isReady={true}
					onPress={(ev) => console.log("")}
					marginVertical={30}
					text="update profile"
					loading={false}
				/>

			</ScrollView>


		</SafeAreaView>
	)
}

export default AddTaskScreen;



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
		paddingTop: 20,
		position: "relative",
		marginTop: 10,
		backgroundColor: Colors.whiteTone1,
	},
	contentScroll_DARK: {
		flex: 1,
		paddingHorizontal: 30,
		paddingTop: 20,
		position: "relative",
		marginTop: 10,
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
