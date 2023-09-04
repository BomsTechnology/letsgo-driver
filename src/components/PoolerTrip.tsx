import React, { useEffect, useState } from 'react'
import { ImageSourcePropType, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, GestureResponderEvent } from 'react-native'
import { Inter_500Medium ,Inter_600SemiBold,Inter_400Regular,Inter_300Light, useFonts} from '@expo-google-fonts/inter'
import { Poppins_700Bold } from '@expo-google-fonts/poppins'
import { tripRider } from '@data/TripData'
import Colors from '@constants/colors'
import Rating from './Rating'


interface riderData {
    name: string,
    rate?: number,
    price: number,
    avatar: ImageSourcePropType
}

type poolerProps={
    tripData:{
        from: string,
        to: string,
        duration:string,
        distance:string,
        date:string
    },
    riders:riderData [],
    onPress:(event: GestureResponderEvent)=>void
}

const whiteMode = true

const RiderCard =({item}:{item:riderData}) => {
    const [hasRate, setHasRate] = useState(false)
    useEffect(()=>{
        if(item.rate) setHasRate(true)
    })
    return (
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image
                source={item.avatar}
                style={{
                    marginLeft:14,
                    width:53,
                    height:53
                }}
                />
                <View style={{marginLeft:14}}>
                    <Text style={[styles.name,
                      whiteMode? {color:Colors.onWhiteTone}
                      :{color:Colors.onPrimaryColor}
                    ]}> {item.name} </Text>
                    {hasRate && <Rating rate={item.rate? item.rate:0} enablerating={false} />}
                </View>
            </View>
            <Text style={styles.price}>${item.price}</Text>
        </View>
    )
}


const PoolerTrip = (props:poolerProps) => {

  return (
    <SafeAreaView style={[styles.container,
        styles.shadowProp,
        whiteMode? {backgroundColor:Colors.whiteTone2}
        : {backgroundColor:Colors.darkTone3}
    ]}>
        <Text style={[styles.title,
          whiteMode? {color:Colors.onWhiteTone}
          : {color:Colors.onPrimaryColor }
        ]}>
            Your trip on {props.tripData.date} 
        </Text>

        <View style={{flexDirection:'row',justifyContent:'space-between', marginLeft:14, marginRight:14}}>
            <View style={styles.locationContainer}>
                <Text style={[styles.start,
                  whiteMode? {color:Colors.onWhiteTone}
                  :{color:Colors.onPrimaryColor,}
                ]}>
                    From {props.tripData.from} 
                </Text>

                <Text style={[styles.start,
                  whiteMode? {color:Colors.onWhiteTone}
                  :{color:Colors.onPrimaryColor}
                ]}>
                    To {props.tripData.to} 
                </Text>
            </View>

            <View style={styles.durationContainer}>
                <Text style={styles.time}> {props.tripData.duration} </Text>
                <Text style={styles.distance}> {props.tripData.distance} </Text>
            </View>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.riderContainer}>
            {props.riders.map((item,indice) => <RiderCard key={indice} item={item} /> )}
        </View>
        <TouchableOpacity 
        onPress={props.onPress}
        style={styles.helpButton}
        >
            <Text style={[styles.btnText,
              whiteMode? {color:Colors.onWhiteTone}
              :{color:Colors.onPrimaryColor}
            ]}>
                I need help
            </Text>

        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        borderRadius:16,
        gap:30,
        marginTop:14
    },
    title:{
       fontFamily:'Poppins_700Bold',
       fontWeight:'700',
       fontSize:22,
       marginLeft:14,
       marginTop:20,
       
    },
    locationContainer:{
        display:'flex',
        flexDirection:'column',
        alignContent:'space-between',
        gap:25,
        width:'60%',  
    },
    start:{
        fontFamily:'Inter_500Medium',
        fontSize:16,
        fontWeight:'500',
        lineHeight:22,
    },
    durationContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-end',
        gap:8,
        minHeight:50,   
    },
    distance:{
        fontFamily:'Inter_400Regular',
        fontWeight:'400',
        fontSize:20,
        color:Colors.secondaryShade1,
            },
    time:{
        fontFamily:'Inter_600SemiBold',
        fontWeight:'600',
        fontSize:28,
        color:Colors.secondaryShade1
    },
    separator:{
        height:1,
        marginLeft:14,
        marginRight:14,
        backgroundColor:Colors.grayTone1
    },
    riderContainer:{
        gap:20,
       
    },
    name:{
        fontFamily:'Poppins_700Bold',
        fontStyle:'normal',
        fontWeight:'700',
        fontSize:22,
    },
    price:{
        marginRight:14,
        fontFamily:'Inter_300Light',
        fontWeight:'500',
        fontSize:26,
        color:Colors.primaryColor
    },
    helpButton:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:14,
        marginLeft:14,
        height:54,
        width:151,
        borderColor:Colors.grayTone3,
        borderWidth:2,
        borderRadius:32
    },
    btnText:{
        fontFamily:'Poppins_700Bold',
        fontStyle:'normal',
        fontWeight:'700',
        fontSize:16,
        letterSpacing:3,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 30,
      },
})

export default PoolerTrip