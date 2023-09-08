import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@constants/colors'

const SearchPlannerScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>SearchPlannerScreen</Text>
    </ScrollView>
  )
}

export default SearchPlannerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
  },
})