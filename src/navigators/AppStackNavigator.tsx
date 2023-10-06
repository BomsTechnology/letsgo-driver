import React from "react";
import DrawerNavigator from "@navigators/DrawerNavigator";
import SkillScreen from "@screens/profile/SkillScreen";
import ExperienceScreen from "@screens/profile/ExperienceScreen";
import IdentityPieceScreen from "@screens/profile/IdentityPieceScreen";
import PersonnalInformationScreen from "@screens/profile/PersonnalInformationScreen";
import AddTaskScreen from "@screens/AddTaskScreen";
import ChatScreen from "@screens/ChatScreen";
import ViewTaskScreen from "@screens/ViewTaskScreen";
import BusinessInformationScreen from "@screens/profile/BusinessInformationScreen";
import SyndicatScreen from "@screens/profile/SyndicatScreen";
import TimetableScreen from "@screens/profile/TimeTableScreen";
import MyPricingScreen from "@screens/profile/MyPricingScreen";
import PreviewDriverDetailScreen from "@screens/profile/PreviewDriverDetailScreen";


const StackNavigator = (stack: any) => {
  return (
    <>
      <stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Skills"
        component={SkillScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Experience"
        component={ExperienceScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="TimeTable"
        component={TimetableScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="IdentityPiece"
        component={IdentityPieceScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="PersonnalInformation"
        component={PersonnalInformationScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="BusinessInformation"
        component={BusinessInformationScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="AddUpdateTaskScreen"
        component={AddTaskScreen}
        options={{ headerShown: false }}
      />
            <stack.Screen
        name="ViewTaskScreen"
        component={ViewTaskScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Syndicat"
        component={SyndicatScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="MyPricing"
        component={MyPricingScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="PreviewDriverDetail"
        component={PreviewDriverDetailScreen}
        options={{ headerShown: false }}
      />
    </>
  );
};

export default StackNavigator;
