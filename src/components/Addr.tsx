import React, { useState } from 'react'
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import Colors from '@constants/colors'
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter'
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'


const Addr = () => {
    const whiteMode =true
    const [value, onChangeText] = useState('');
    const [error, setError] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const borderBottomColor = error ? 'red' : isFocused ? Colors.primaryColor : Colors.grayTone1;
    const handleSubmit = () => {
      // validez les données et traitez-les ici
      setError(true); // ou setError(false) si le champ est valide
    };

    const [fontsLoaded] = useFonts({
        Inter_500Medium
      });

      if (!fontsLoaded) {
        return null;
      }
  return (
    <View style={[styles.container,
        whiteMode? {backgroundColor:Colors.onPrimaryColor}
        :{backgroundColor:Colors.darkTone1}
    ]}>
        
        <View 
          style={{
            flexDirection:'row', 
            justifyContent:'space-between',
            marginHorizontal:8,
            marginTop:14
            }}> 
                <Text style={[styles.title,
                  whiteMode? {color:Colors.onWhiteTone}
                  :{color:Colors.onPrimaryColor}
                ]}>Your location</Text>
                <MaterialCommunityIcons name='crosshairs-gps' size={24} color={Colors.secondaryColor}  />
        </View>

        <TextInput
            placeholder="Melen,Yaoundé-Cameron"
            placeholderTextColor={whiteMode? Colors.grayTone3:Colors.grayTone4}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.input,{borderBottomColor :borderBottomColor},
                whiteMode? {color:Colors.grayTone3}
                :{color: Colors.grayTone4,}
            ]}
            value={value}
            onChangeText={text =>onChangeText(text)}
        />

        <View style={styles.map}>
            <View>
            <Text style={[styles.choiseText,
              whiteMode? {color:Colors.onWhiteTone}
              :{color:Colors.onPrimaryColor}
            ]}>Choose on map</Text>
            </View>
           
            <TouchableOpacity
             onPress={handleSubmit}
            >
                <Octicons name="location" size={24} color={Colors.secondaryColor} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        borderRadius:10,
        marginTop:20,
        shadowColor: '#171717',
        elevation: 4,

    },

    title:{
        fontFamily:'Inter_500Medium',
        fontWeight:'500',
        fontSize:20,
    },

    choiseText:{
        fontFamily:'Inter_500Medium',
        fontStyle:'normal',
        fontWeight:'500',
        fontSize:20,
        lineHeight:20,
    },
    map:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:8,
        marginBottom:14,
        marginTop:14
    },


    input: {
        fontFamily:'Inter_500Medium',
        fontStyle:'normal',
        fontWeight:'500',
        fontSize:15,
        borderBottomWidth: 2,
        marginHorizontal:8
    },

})

export default Addr