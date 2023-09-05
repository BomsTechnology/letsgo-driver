import React from "react";
import DrawerNavigator from "@navigators/DrawerNavigator";
import SkillScreen from "@screens/profile/SkillScreen";
import ExperienceScreen from "@screens/profile/ExperienceScreen";
import TimeTableScreen from "@screens/profile/TimeTableScreen";
import IdentityPieceScreen from "@screens/profile/IdentityPieceScreen";
import PersonnalInformationScreen from "@screens/profile/PersonnalInformationScreen";


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
        component={TimeTableScreen}
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
    </>
  );
};

export default StackNavigator;
