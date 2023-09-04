import { ImageSourcePropType, StyleSheet, Text, View, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Rating from '@components/Rating';

interface TripInfoCardProps {
  image : string | ImageSourcePropType;
  label?: string;
  title: string;
  info1?: string;
  info2?: string;
  rate: number;
  borderColor?: string;
  carColor?: string;
  carMatricule?: string;
  onPress: (event: GestureResponderEvent) => void;
}

const TripInfoCard = ({image, label, title, info1, info2, rate, carColor, borderColor, onPress, carMatricule}:TripInfoCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      {label && <Text style={[styles.lightText, {marginBottom:5, marginLeft:5}]}>{label}</Text>}
      <View style={[styles.cardContainer, {borderColor: borderColor ? borderColor : Colors.primaryColor,}]}>
        <Image resizeMode='contain' style={[styles.image]} source={image as ImageSourcePropType} />
        <View style={[{marginLeft: 10, flexGrow:1}]}>
            <Text style={[styles.boldText]}>{title}</Text>
            {info1 && <Text style={[styles.mediumText]}>{info1}</Text>}
            {info2 && <Text style={[styles.lightText]}>{info2}</Text>}
            <Rating enablerating={false} rate={rate} size={12}/>
        </View>
        <View style={[{alignItems: 'flex-end'}]}>
            {carMatricule && <Text style={[styles.mediumText]}>{carMatricule}</Text>}
            {carColor && <View style={[styles.carColor, {backgroundColor: carColor}]}></View>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TripInfoCard;

const styles = StyleSheet.create({
    container:{
        width: "100%",
        marginVertical: 5
    },
    cardContainer: {
        width: "100%",
        borderWidth: 2,
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      borderWidth: 0.5,
      borderColor: Colors.grayTone4
    },
    carColor: {
      width: 20,
      height: 20,
      borderRadius: 20 / 2,
    },
    boldText: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        color: Colors.grayTone1
      },
    semiBoldText: {
      fontSize: 14,
      fontFamily: 'Poppins_600SemiBold',
      color: Colors.grayTone1
    },
    mediumText: {
      fontSize: 13,
      fontFamily: 'Poppins_500Medium',
      color: Colors.grayTone1
    },
    lightText: {
      fontSize: 12,
      fontFamily: 'Poppins_300Light',
      color: Colors.grayTone2
    }
});