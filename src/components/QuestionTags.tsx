import React, { useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View ,SafeAreaView,FlatList} from 'react-native'
import Colors from '@constants/colors'
import { Poppins_400Regular ,useFonts} from '@expo-google-fonts/poppins'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'

type itemType ={content:string}
type questionTagsProps={
  question:string,
  responses:itemType[]
}

const Item =({content}:itemType)=>{
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemtext}>{content}</Text>
    </View>
  )
}

const QuestionTags = (props:questionTagsProps) => {

  const [whiteMode, setMode]=useState(true)

  const [showContent, setShowContent] = useState(false)

  const [fontsLoaded] = useFonts({
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView style={[styles.container,
      whiteMode? {backgroundColor:Colors.whiteTone2}
      :{backgroundColor:Colors.darkTone1,}
    ]}>
      <TouchableOpacity 
      style={[styles.titleContainer,
        !showContent ?{borderBottomWidth:2}:{},
        whiteMode? {borderBottomColor:Colors.grayTone4}
        : {borderBottomColor:Colors.grayTone1,}
      ]} 
      onPress={()=>setShowContent(!showContent)}>
        <View style={styles.t}>
            <Text style={[styles.title,
              whiteMode? {color:Colors.onWhiteTone}
              :{color:Colors.onPrimaryColor,}
            ]}>
              {props.question}
            </Text>
        </View>
          
          <View >
          <Entypo 
          name={showContent? "chevron-up":"chevron-down"} 
          size={24}
          color={whiteMode? Colors.onWhiteTone:Colors.onPrimaryColor} 
          style={styles.icon} 
          />
          </View>
      </TouchableOpacity>
        {showContent && (
          <ScrollView style={styles.body}>
            {
              props.responses.map((item, indice) => <Item key={indice} content={item.content} />)
            }
          </ScrollView>
        )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      display: 'flex',
      marginTop:20,
      
    },
    t:{
      width:'80%',
      marginTop:14,
      marginBottom:14
    },
    titleContainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      

    },
    icon:{
      width:24,
      height:24,
      marginRight:14
    },
    title:{
      fontFamily:'Poppins_400Regular',
      fontStyle:'normal',
      fontWeight:'400',
      fontSize:16,
      lineHeight:24,
      marginLeft:14,
      
  
    },
    body:{},
    itemContainer:{
      marginLeft:14,
      marginRight:14,
      marginBottom:14,
      borderBottomColor:Colors.grayTone1,
      borderBottomWidth:1
    },
    itemtext:{
      fontFamily:'Poppins_400Regular',
      fontStyle:'normal',
      fontWeight:'400',
      fontSize:16,
      lineHeight:24,
      color:Colors.grayTone2
    }
})
export default QuestionTags