import React from 'react'
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@constants/colors';
import { RootState, useAppSelector,  } from "@store/store";
import AlertScreen from '@screens/AlertScreen';
import PlanningScreen from '@screens/PlanningScreen';
import SearchScreen from '@screens/SearchScreen';
//import i18n from '../locales/i18n';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
          } else if (route.name === 'Alert') {
            iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
          }else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={20} color={color} style={{ alignSelf: 'center', marginTop:0 }} />;
        },
        tabBarActiveTintColor:  Colors.secondaryColor,
        tabBarInactiveTintColor: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.onWhiteTone,
        tabBarLabelStyle: { fontSize: 13, fontFamily: 'Poppins_500Medium', alignSelf: 'center', maxWidth: '75%' },
        tabBarStyle: {  position:'absolute', bottom:0, elevation: 0, borderTopWidth:0 },
        tabBarInactiveBackgroundColor: settingState.setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2,
        tabBarActiveBackgroundColor: settingState.setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2, 
        headerTransparent: true,
        tabBarShowLabel: false,
        tabBarItemStyle: {
            marginHorizontal: 5, 
            flexDirection: 'row-reverse', 
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingHorizontal: 20,
            gap: 0,
          }
      })}>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                  tabBarLabel: "Home", 
                  headerShown: false
                }} 
              />
              <Tab.Screen 
                name="Alert" 
                component={AlertScreen} 
                options={{ 
                  tabBarLabel: `Alert`, 
                  headerShown: false,
                }} 
              />
              <Tab.Screen 
                name="Task" 
                component={PlanningScreen} 
                options={{ 
                  tabBarLabel: `Task`, 
                  headerShown: false,
                }} 
              />
              <Tab.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{ 
                  tabBarLabel: `Search`, 
                  headerShown: false,
                }} 
              />
        </Tab.Navigator>
    )
}

export default TabNavigator