import React from "react";
import DrawerNavigator from "@navigators/DrawerNavigator";
import SkillScreen from "@screens/profile/SkillScreen";
import ExperienceScreen from "@screens/profile/ExperienceScreen";
import TimetableScreen from "@screens/profile/TimetableScreen";
import IdentityPieceScreen from "@screens/profile/IdentityPieceScreen";
import PersonnalInformationScreen from "@screens/profile/PersonnalInformationScreen";
import AddTaskScreen from "@screens/AddTaskScreen";


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
        name="AddUpdateTaskScreen"
        component={AddTaskScreen}
        options={{ headerShown: false }}
      />
    </>
  );
};

export default StackNavigator;
