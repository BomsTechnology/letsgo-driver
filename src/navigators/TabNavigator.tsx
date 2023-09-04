import React from 'react'
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@constants/colors';
import { RootState, useAppSelector,  } from "@store/store";
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
          } else {
            iconName = focused ? 'location' : 'location-outline';
          }

          return <Ionicons name={iconName} size={18} color={color} style={{ alignSelf: 'center', marginTop:0 }} />;
        },
        tabBarActiveTintColor:  Colors.onPrimaryColor,
        tabBarInactiveTintColor: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.onWhiteTone,
        tabBarLabelStyle: { fontSize: 13, fontFamily: 'Poppins_500Medium', alignSelf: 'center', maxWidth: '75%' },
        tabBarStyle: { backgroundColor: 'transparent', position:'absolute', bottom:0, elevation: 0, borderTopWidth:0, paddingHorizontal: 10, marginBottom: 15 },
        tabBarInactiveBackgroundColor: settingState.setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2,
        tabBarActiveBackgroundColor: Colors.secondaryColor,
        headerTransparent: true,
        tabBarItemStyle: {
            borderRadius: 10, 
            marginHorizontal: 5, 
            flexDirection: 'row-reverse', 
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingHorizontal: 20,
            gap: 0,
            shadowColor: '#171717',
            elevation: 4,
          }
      })}>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                  tabBarLabel: `Home`, 
                  headerShown: false,
                }} 
              />
        </Tab.Navigator>
    )
}

export default TabNavigator