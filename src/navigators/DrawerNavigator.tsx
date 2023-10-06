import React, { useEffect } from "react";
import TabNavigator from "./TabNavigator";
import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import IconButton from "@components/buttons/IconButton";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { AppStackParamList } from "@navigators/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Rating from "@components/Rating";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { logout } from "@services/useAuth";
import { showError, showSuccess } from "@functions/helperFunctions";
import ProfileScreen from "@screens/profile/ProfileScreen";
import ChatScreen from "@screens/ChatScreen";
import ConversationScreen from "@screens/ConversationScreen";
import PricingScreen from "@screens/PricingScreen";
//import i18n from '../locales/i18n';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  const driverState = useAppSelector((state: RootState) => state.driver);
  const dispatch = useAppDispatch();
  const menuIcon = (
    <Ionicons name="chevron-back" size={25} color={settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.onWhiteTone} />
  );

  

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{ flex: 1, paddingTop: 10, paddingHorizontal: 10, backgroundColor: settingState.setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2, }}
          >
            <IconButton
              icon={menuIcon}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
            <View style={{ alignItems: "center" }}>
            {driverState.driver?.picture ? (
            <Image
              resizeMode="cover"
              style={{
                height: 130,
                width: 130,
                borderRadius: 65,
                marginBottom: 20
              }}
              source={{ uri: driverState.driver?.picture }}
            />
          ) : (
            <Ionicons
              name="person-circle"
              size={130}
              color={Colors.primaryColor}
            />
          )}

              <Rating enablerating={false} rate={driverState.driver?.score?.starCount!} size={15} />

              <Text
                style={{
                  fontSize: 19,
                  marginVertical: 8,
                  color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.onWhiteTone,
                  fontFamily: 'Poppins_600SemiBold',

                }}
              >
                Hi {driverState.driver?.firstName || driverState.driver?.lastName || driverState.driver?.businessName || "Driver"}  
              </Text>
              <View
                style={{
                  height: 40,
                  width: 95,
                  backgroundColor: Colors.primaryColor,
                  borderRadius: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.whiteTone1,
                    fontFamily: 'Poppins_600SemiBold',
                  }}
                >
                  DRIVER
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 5, paddingTop:15 }}>
              <DrawerItemList {...props} />
            </View>
            <View style={{ 
              height: 100,
              paddingHorizontal:15,
              justifyContent: 'center'
             }}>

            </View>
            <View style={{ 
              paddingVertical: 10,
              paddingHorizontal: 20,
             }}>
              <Text
              style={{
                textAlign: "center",
                fontFamily: 'Poppins_300Light',
                letterSpacing: 3,
                color: Colors.grayTone2,
              }}
              >LETSGO DRIVER</Text>
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerPosition: "left",
        drawerStyle: {
          borderBottomRightRadius: 50,
          borderTopRightRadius: 50,
          overflow: 'hidden',
        },
        drawerInactiveTintColor: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone2,
        drawerActiveTintColor: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone2,
        drawerInactiveBackgroundColor: settingState.setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2,
        drawerActiveBackgroundColor: settingState.setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2,
        //overlayColor: 'transparent',
        drawerItemStyle: {
          padding:0,
          paddingVertical:0,
          margin:0,
          marginVertical: 0
        },
        drawerLabelStyle: {
          lineHeight: 15,
          fontFamily: 'Poppins_400Regular'
        },
      }}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerLabel: `Home`,
          drawerIcon: () => (
            <Ionicons
              name="home-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          drawerLabel: "Profile",
          drawerIcon: () => (
            <Ionicons
              name="person-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={ConversationScreen}
        options={{
          headerShown: false,
          drawerLabel: "Chat",
          drawerIcon: () => (
            <Ionicons
              name="chatbubbles-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Pricing"
        component={PricingScreen}
        options={{
          headerShown: false,
          drawerLabel: "Subscription",
          drawerIcon: () => (
            <Ionicons
              name="pricetags-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 200,
    marginTop: 5,
    borderRadius: 6,
    height: 42,
    marginBottom: 15,
  },
  shadowProp: {
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
});
