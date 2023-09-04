import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';

const LoadingButton = () => {
  return (
    <View style={{ 
        width:"100%",
        paddingVertical: 10,
        marginVertical: 10
     }}>
      <ActivityIndicator size={'large'} color={Colors.primaryColor} />
    </View>
  );
};

export default LoadingButton;

const styles = StyleSheet.create({});