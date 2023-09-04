import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '@constants/colors'

const CodeSuccess = () => {
  return (
    <View style={styles.container}>
        <FontAwesome name="check" size={32} color={Colors.onWhiteTone}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:72,
        width:72,
        backgroundColor:'transparent',
        borderColor:Colors.primaryShade1,
        borderWidth:6,
        borderRadius:50
    }
})
export default CodeSuccess