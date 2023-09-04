import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@constants/colors';

interface StepHeaderProps {
    elementsNumber: number,
    currentStep: number,
}

const StepHeader = (props: StepHeaderProps) => {

    const elts: JSX.Element[] = [];
    
    for (let index = 0; index < props.elementsNumber; index++) {
        elts.push(<View key={index} style={[styles.headerItem, 
            {
                backgroundColor: (index + 1 ) <= props.currentStep ? Colors.secondaryColor : Colors.grayTone4 , 
                width: `${(100 / props.elementsNumber) - props.elementsNumber}%`
            }]}></View>)
    } 

  return (
    <View style={[
        styles.header,
    ]}>
        {
           elts
        }
      
    </View>
  )
}

export default StepHeader

const styles = StyleSheet.create({
    header: {
        flex: 0.010,
        flexShrink: 0,
        marginBottom: 20,
        justifyContent: 'space-between',
        overflow: 'hidden',
        flexDirection: 'row',

      },
      headerItem: {
        borderRadius: 100,
        marginHorizontal: 5,
      },
})