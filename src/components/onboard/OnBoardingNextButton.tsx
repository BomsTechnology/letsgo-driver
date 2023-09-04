import { StyleSheet, useWindowDimensions, View, TouchableOpacity, Animated, GestureResponderEvent, Pressable, Text } from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Ionicons} from '@expo/vector-icons';
import { Svg, G, Circle, CircleProps } from 'react-native-svg';
import Colors from '@constants/colors';

interface NextButtonProps {
  percentage: number,
  scrollTo:  (event: GestureResponderEvent) => void,
}

const OnBoardingNextButton = (props: NextButtonProps) => {
    const {width} = useWindowDimensions();
    const size = 80;
    const strokeWidth = 4;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<Circle | null>(null);

    const animation = ({toValue}: {toValue: number}) =>  {
      return Animated.timing(progressAnimation, {
          toValue,
          duration: 250,
          useNativeDriver: true
      }).start();
    }

    useEffect(() =>  {
      animation({toValue: props.percentage});
    }, [props.percentage]);

    useEffect(() => {
      progressAnimation.addListener(
        (value) => {
          const strokeDashoffset = circumference - (circumference * value.value) / 100;
          
          const setNativeProps = progressRef.current?.setNativeProps as (props: CircleProps) => void | undefined;
            setNativeProps?.({ strokeDashoffset: strokeDashoffset });
        },
      );

      return () => {
        progressAnimation.removeAllListeners();
      };
    }, []);

  return (
    <View style={[styles.container, {width}]}>
    <Pressable onPress={props.scrollTo}  style={[styles.shadowProp, {display:'flex', alignItems:'center', justifyContent:'center'}]}>
      <Svg width={size} height={size} >
        <Circle cy={center} cx={center} r={radius} stroke={Colors.grayTone4} strokeWidth={strokeWidth} />
        <Circle 
          ref={progressRef}
          cy={center} 
          cx={center} 
          r={radius} 
          stroke={Colors.primaryColor}
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference}
          />
          <Pressable  style={styles.button} >
          <View style={[styles.circle100, {backgroundColor: (props.percentage === 100) ? Colors.secondaryColor: Colors.whiteTone2}]}>
            <Ionicons
              name="chevron-forward"
              size={32}
              color={(props.percentage === 100) ? Colors.onPrimaryColor: Colors.onWhiteTone}
            />
          </View>
          </Pressable >
      </Svg>
    </Pressable>
    </View>
  );
};

export default OnBoardingNextButton;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.whiteTone1 ,
        position: 'relative',
        paddingBottom: 20
    },
    shadowProp: {
      shadowColor: '#171717',
      elevation: 4,
      backgroundColor: Colors.whiteTone3,
      borderRadius: 100
    },
    button: {
      position: 'absolute',
      backgroundColor: Colors.whiteTone1,
      borderRadius: 100,
      alignSelf: 'center',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      top: 14,
    },
    circle100:{
      borderRadius:100,
      width:50,
      height:50,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
    }
});