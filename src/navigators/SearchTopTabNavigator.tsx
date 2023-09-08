import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '@constants/colors';


const Tab = createMaterialTopTabNavigator();

import SearchPollerScreen from '@screens/search/SearchPollerScreen';
import SearchPlannerScreen from '@screens/search/SearchPlannerScreen';


const SearchTopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="TripInfoSchedule"
      screenOptions={{
        tabBarActiveTintColor: Colors.onPrimaryColor,
        tabBarInactiveTintColor: Colors.onWhiteTone,
        tabBarIndicatorStyle: {backgroundColor: Colors.primaryColor, height: '100%', borderRadius: 30 },
        tabBarLabelStyle: { fontSize: 13, fontFamily: 'Poppins_500Medium'},
        tabBarStyle: { backgroundColor: Colors.whiteTone2, borderRadius: 30, elevation: 1, marginHorizontal: 30, marginBottom: 10 },
      }}
    >
      <Tab.Screen
        name="SearchPoller"
        component={SearchPollerScreen}
        options={{ tabBarLabel: 'Poller',  }}
      />
      <Tab.Screen
        name="SearchPlanner"
        component={SearchPlannerScreen}
        options={{ tabBarLabel: 'Planner' }}
      />
    </Tab.Navigator>
  );
};

export default SearchTopTabNavigator;
