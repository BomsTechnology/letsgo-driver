import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@constants/colors'

const SearchPollerScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBox}>
        
      </View>
      <Text>SearchPollerScreen</Text>
    </ScrollView>
  )
}

export default SearchPollerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
  },
  searchBox : {
    backgroundColor: Colors.whiteTone2,
    padding: 10,
    borderRadius: 10
  }
})