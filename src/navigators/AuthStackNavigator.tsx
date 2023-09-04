import React from 'react';
import LoginScreen from '@screens/auth/LoginScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import OTPScreen from '@screens/auth/OTPScreen';

const AuthStackNavigator = (stack: any) => {
  return (
        <>
          <stack.Screen name="OnBoarding" component={OnboardingScreen} options={{ headerShown: false }} />
          <stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
        </>
  );
};

export default AuthStackNavigator;