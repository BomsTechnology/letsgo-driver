import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import Colors from '@constants/colors'
import { Poppins_300Light, useFonts } from '@expo-google-fonts/poppins'

type messageTypeProps={
  theme:string,
  message:string
}
const MessageCard = ({theme, message}:messageTypeProps) => {
    const [fontsLoaded] = useFonts({
        Poppins_300Light
      });

      if (!fontsLoaded) {
        return null;
      }


  return (
    <View style={styles.container}>
        <Text style={styles.textStyle}> {message} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.darkTone4,
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        borderTopRightRadius:12,
        alignItems:'center',
        height:66,
        justifyContent:'center'
    },
    textStyle:{
        fontStyle:'normal',
        fontSize:16,
        lineHeight:22,
        color:Colors.onPrimaryColor,
        fontWeight:'300',
        fontFamily:'Poppins_300Light',
        padding:10
    }
})

export default MessageCard