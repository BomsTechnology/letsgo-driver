import { StyleSheet, Text, View, Image, ImageSourcePropType, GestureResponderEvent } from 'react-native';
import React from 'react';
import CustomButton from './buttons/CustomButton';
import Colors from '@constants/colors';


interface NoResultotTripProps {
    message: string;
    buttonLabel?: string;
    image: ImageSourcePropType;
    actionButton?: (event: GestureResponderEvent) => void;
}

const NoResult = ({message, buttonLabel, image, actionButton}: NoResultotTripProps) => {
    
  return (
    <View style={[styles.container]}>
        <Image source={image} />
        <Text style={[styles.text]}>
           {message}
        </Text>
        {(buttonLabel && actionButton) &&<View style={[styles.buttonContainer]}>
            <CustomButton 
                    bgColor={Colors.primaryColor}
                    fgColor='#fff'
                    isReady={true}
                    onPress={actionButton}
                    text={buttonLabel}
                    radius={50}
                /> 
        </View>}
    </View>
  );
};

export default NoResult;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
        paddingEnd: 10
    },
    text: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 20
    },
    buttonContainer: {
        
    }
});