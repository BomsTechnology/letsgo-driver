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
import { FAB } from "react-native-paper";


interface optionsProps {
  id: string;
  icon: JSX.Element;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const ProfileScreen = () => {

  const settingState = useAppSelector((state: RootState) => state.setting);
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();



  const options: optionsProps[] = [
    {
      id: "6",
      label: 'Personnal Information',
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
      onPress: () => navigation.navigate("PersonnalInformation"),
    },
    {
      id: "2",
      label: "Skills",
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
      onPress: () => navigation.navigate("Skills"),
    },
    {
      id: "3",
      label: "Experience",
      icon: (
        <Ionicons
          name="list-circle-outline"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => navigation.navigate("Experience"),
    },
    {
      id: "5",
      label: 'Identity Piece',
      icon: (
        <Entypo
          name="v-card"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => navigation.navigate("IdentityPiece"),
    },
    {
      id: "4",
      label: "Time Table",
      icon: (
        <Ionicons
          name="calendar-outline"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => navigation.navigate("TimeTable"),
    },
    
    
  ];

  const optionsItemRender = ({ item }: { item: optionsProps }) => {
    return (
      <TouchableOpacity style={styles.faqItem} onPress={item.onPress}>
        {item.icon}
        <Text
          style={
            settingState.setting.isDarkMode
              ? styles.faqText_DARK
              : styles.faqText
          }
        >
          {item.label}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={30}
          color={Colors.primaryColor}
        />
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
        <SimpleHeader text="Manage Profile" />
        <FAB
        icon="eye"
        color={Colors.secondaryColor}
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
        <FlatList
          data={options}
          showsHorizontalScrollIndicator={false}
          renderItem={optionsItemRender}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          style={{ flex: 1, marginTop: 20 }}
        />
      </SafeAreaView>
    </>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 9999,
    backgroundColor: Colors.primaryColor,
    color: Colors.onPrimaryColor
  },
    container: {
      flex: 1,
      backgroundColor: Colors.whiteTone2,
      padding: 20,
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
    },
    minText: {
      fontFamily: "Poppins_400Regular",
      color: Colors.grayTone3,
    },
  });