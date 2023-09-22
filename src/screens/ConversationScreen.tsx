import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Ionicons, MaterialCommunityIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { FlatList } from "react-native";
import { GestureResponderEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import { Switch } from "react-native";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { Avatar } from "react-native-paper";
import { Dimensions } from "react-native";


interface ConversationProps {
	id: string;
	icon: JSX.Element;
	label: string;
	unreadMessageCount?: number,
	lastMessage?: string,
}



const ConversationScreen: React.FC = () => {

	const settingState = useAppSelector((state: RootState) => state.setting);
	const dispatch = useAppDispatch();

	const navigation =
		useNavigation<NativeStackNavigationProp<AppStackParamList>>();



	const options: ConversationProps[] = [
		{
			id: "6",
			label: 'Mr Tobi',
			icon: (
				<Ionicons
					name="person-outline"
					size={25}
					color={
						settingState.setting.isDarkMode
							? Colors.grayTone3
							: Colors.grayTone1
					}
				/>
			),
		},
		{
			id: "3",
			label: 'Mr Teubou Tonzong Christian',
			lastMessage: "khjhjihjgjghjhjhhgggggggggggggggggggggggggggggggggggggggggggggggggggg",
			icon: (
				<Ionicons
					name="person-outline"
					size={25}
					color={
						settingState.setting.isDarkMode
							? Colors.grayTone3
							: Colors.grayTone1
					}
				/>
			),
		},
		{
			id: "2",
			label: "Mme X",
			lastMessage: "khjhjihjgjghjhjhhgggggggggggggggggggggggggggggggggggggggggggggggggggg",
			unreadMessageCount: 3,
			icon: (
				<SimpleLineIcons
					name="puzzle"
					size={25}
					color={
						settingState.setting.isDarkMode
							? Colors.grayTone3
							: Colors.grayTone1
					}
				/>
			),
		},


	];

	const conversationItemRender = ({ item }: { item: ConversationProps }) => {

		return (

			<TouchableOpacity style={styles.faqItem} onPress={() => navigation.navigate("ChatScreen")}>

				<View style={{
					width: 50,
					height: 50,
					alignItems: "center",
					justifyContent: "center",
					borderRadius: 50,
					margin: 5,
					borderWidth: 0.6
				}}
				>
					{item.icon}
				</View>

				<View style={{
					justifyContent: "center",
					padding: 5,
				}}
				>

					<Text
						numberOfLines={1}
						style={{
							flex: 1,
							textAlign: "left",
							fontFamily: "Poppins_400Regular",
							fontWeight: "700",
							fontSize: 17,
							maxWidth: Dimensions.get("screen").width - 120
						}}
					>
						{item.label}
					</Text>

					<Text
						numberOfLines={1}

						style={{
							flex: 1,
							textAlign: "left",
							color: Colors.grayTone1,
							fontFamily: "Poppins_400Regular",
							fontSize: 13,
							maxWidth: Dimensions.get("screen").width - 120
						}}
					>
						{item.lastMessage}
					</Text>

				</View>

				{
					item.unreadMessageCount &&
					<View style={{
						width: 20,
						height: 20,
						borderRadius: 20,
						alignItems: "center",
						justifyContent: "center",
						padding: 1,
						backgroundColor: Colors.primaryColor,
						position: "absolute",
						right: 10,
					}}
					>

						<Text
							style={{
								textAlign: "center",
								color: "white",
								fontFamily: "Poppins_400Regular",
								fontWeight: "700",
								fontSize: 12,
							}}
						>
							{item.unreadMessageCount}
						</Text>

					</View>
				}

			</TouchableOpacity>
		);
	};


	return (
		<>
			<SafeAreaView
				style={
					settingState.setting.isDarkMode
						? styles.container_DARK
						: styles.container
				}
			>

				<View style={{
					paddingHorizontal: 20,
					paddingTop: 20,
				}}
				>
					<SimpleHeader text="Conversation" />

				</View>

				<FlatList
					data={options}
					showsHorizontalScrollIndicator={false}
					renderItem={conversationItemRender}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
					style={{ flex: 1, marginTop: 10 }}
				/>
			</SafeAreaView>
		</>
	);
}

export default ConversationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.whiteTone2,
	},
	container_DARK: {
		flex: 1,
		backgroundColor: Colors.darkTone1,
		padding: 20,
	},
	faqText: {
		flex: 1,
		textAlign: "left",
		color: Colors.grayTone1,
		marginLeft: 5,
		fontFamily: "Poppins_400Regular",
		fontSize: 18,
	},
	faqText_DARK: {
		flex: 1,
		textAlign: "left",
		color: Colors.onPrimaryColor,
		marginLeft: 5,
		fontFamily: "Poppins_400Regular",
		fontSize: 18,
	},
	faqItem: {
		flexDirection: "row",
		alignItems: "center",
		position: "relative",
		paddingHorizontal: 5,
		borderBottomWidth: 1,
		borderBottomColor: Colors.whiteTone1
	},
	minText: {
		fontFamily: "Poppins_400Regular",
		color: Colors.grayTone3,
	},
});