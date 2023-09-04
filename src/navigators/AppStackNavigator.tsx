import React from "react";
import DrawerNavigator from "@navigators/DrawerNavigator";


const StackNavigator = (stack: any) => {
  return (
    <>
      <stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </>
  );
};

export default StackNavigator;
