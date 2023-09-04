import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@constants/ComponentStyled';
import { PlaceProps } from '../types/PlaceProps';
import Colors from '@constants/colors';
import { RootState, useAppSelector } from '@store/store';

const SearchPlaceItem = ({ item, onPress }: { item: PlaceProps, onPress(item: PlaceProps): Promise<void> }) => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );  
  let text = item.properties?.state || item.properties?.country || "";
    if (text !== "") text += ", ";
  return (
    <TouchableOpacity
        style={[styles.itemContainer]}
        onPress={() => onPress(item)}
      >
        <Ionicons name="time-outline" size={20} color={Colors.grayTone4} />
        <View style={{ flex: 1 }}>
          <Text style={[settingState.setting.isDarkMode ? styles.itemTextBold_DARK : styles.itemTextBold]}>{item.properties.name}</Text>
          <Text style={[settingState.setting.isDarkMode ? styles.itemTextLight_DARK : styles.itemTextLight]}>
            {text}
            {item.properties?.country}
          </Text>
          <Divider style={{ marginTop: 10 }} />
        </View>
      </TouchableOpacity>
  )
}

export default SearchPlaceItem

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      },
      itemTextBold: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: Colors.onWhiteTone,
      },
      itemTextLight: {
        color: Colors.grayTone2,
        fontFamily: "Poppins_300Light",
        fontSize: 13,
      },
      itemTextBold_DARK: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: Colors.onPrimaryColor,
      },
      itemTextLight_DARK: {
        color: Colors.grayTone4,
        fontFamily: "Poppins_300Light",
        fontSize: 13,
      },
})