import React, { useState, useEffect } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity, View ,StyleSheet} from 'react-native';
import Colors from '@constants/colors';

type isWritable ={rate:number,size?:number, enablerating:boolean}

const Rating = ({rate, size, enablerating}:isWritable) => {

    const [starRating, setStarRating] = useState(0);
    useEffect(() => {
      if(!enablerating){setStarRating(rate);}  
    });
   // useEffect()
  return (
    <View style={styles.stars}>
    <TouchableOpacity onPress={() => {enablerating? setStarRating(1):{}}}>
      <MaterialIcons
        name={starRating >= 1 ? 'star' : 'star-border'}
        size={size? size:16}
        style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {enablerating? setStarRating(2):{}}}>
      <MaterialIcons
        name={starRating >= 2 ? 'star' : 'star-border'}
        size={size? size:16}
        style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {enablerating? setStarRating(3):{}}}>
      <MaterialIcons
        name={starRating >= 3 ? 'star' : 'star-border'}
        size={size? size:16}
        style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {enablerating? setStarRating(4):{}}}>
      <MaterialIcons
        name={starRating >= 4 ? 'star' : 'star-border'}
        size={size? size:16}
        style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {enablerating? setStarRating(5):{}}}>
      <MaterialIcons
        name={starRating >= 5 ? 'star' : 'star-border'}
        size={size? size:16}
        style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
      />
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    stars: {
      display: 'flex',
      flexDirection: 'row',
    },
    starUnselected: {
      color: Colors.grayTone1,
    },
    starSelected: {
      color: Colors.accentYellow,
    },
  });

export default Rating