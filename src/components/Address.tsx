import { EvilIcons, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, View ,Text, TouchableOpacity } from 'react-native'
import Colors from '@constants/colors'
import { Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins'

type AddressProps={
        address:string,
        location:string,
        distance:string
    }

const Address = ({address, location, distance}:AddressProps) => {
    
const darkmode =false
    const [selected, setSelected] = useState(false)
    const [fontsLoaded] = useFonts({
        Poppins_500Medium, 
      });
    
      if (!fontsLoaded) {
        return null;
      }


  return (
    <TouchableOpacity 
    onPress={()=>setSelected(!selected)}
    style={[styles.container,
        selected? {backgroundColor:Colors.grayTone4,}
        :darkmode? {backgroundColor:Colors.darkTone1,borderBottomColor:Colors.grayTone3}
        :{backgroundColor:Colors.whiteTone2}
    ]}
    >
        <View style={{flexDirection:'column',marginLeft:14}}>
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <Ionicons 
                    name="home" 
                    size={24} 
                    color={Colors.primaryColor}/>
                    <Text 
                    style={[styles.text, {fontSize:20, marginLeft:8},
                        darkmode? {color:Colors.onPrimaryColor}
                        :{color:Colors.onWhiteTone}
                    ]}> 
                        {address} 
                    </Text>
            </View>

            <Text style={[styles.text, {fontSize:15},
                selected? {color:Colors.darkTone2}
                :darkmode? {color:Colors.grayTone4}
                :{color:Colors.grayTone2}
            ]}> 
                 {location} 
            </Text>
        </View>

        <View style={{flexDirection:'row', marginRight:14}}>
            <Text style={[styles.text, {fontSize:15},
                selected? {color:Colors.darkTone2}
                :darkmode? {color:Colors.grayTone4}
                :{color:Colors.grayTone2}
            ]}> 
              {distance} 
            </Text>

            <EvilIcons 
            name="sc-telegram" 
            size={24} 
            color={Colors.primaryColor} />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomColor:Colors.grayTone4,
        borderBottomWidth:2,
        height:94,
        marginTop:14
    },
    text:{
        fontFamily:'Poppins_500Medium',
        fontStyle:'normal',
        fontWeight:'500',
        letterSpacing:0.2
    }
})
export default Address