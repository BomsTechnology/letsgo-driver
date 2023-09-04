import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FilterTripItemProps } from '@data/FilterTripItem'
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Colors from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { setFilterValue, setInputValue } from "@store/features/search/myTripSearchSlice";

const SortBy = () => {
    const mytripSearchState = useAppSelector((state: RootState) => state.myTripSearch);
    const dispatch = useAppDispatch();
    const [filterTripValue, setFilterTripValue] = useState<string>(mytripSearchState.filterTripValue);
    const filterItemRender = ({ item }: {item : FilterTripItemProps}) =>{
        return (
            <TouchableOpacity 
                    style={[
                            styles.filterItem,
                            {
                                borderColor: mytripSearchState.filterTripValue == item.value ? Colors.secondaryColor : Colors.grayTone4,
                            }
                        ]} 
                    onPress={() => dispatch((setFilterValue(item.value)))}
                    >
                    <Text
                        style={[
                            styles.filterItem_text,
                            {
                                color: mytripSearchState.filterTripValue == item.value ? Colors.grayTone1 : Colors.grayTone4,
                            }
                        ]}
                        >{item.label}</Text>
                </TouchableOpacity>
        )
        }
  return (
    <>
        {mytripSearchState.showFilter &&
            <View style={{ 
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                maxHeight: 100,
                paddingLeft:10
            }}>
                <Text style={[styles.filterItem_text, {fontSize: 16}]}>Sort By : </Text>
                <FlatList
                        data={mytripSearchState.filterTripItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={filterItemRender}
                        keyExtractor={(item)=>item.value}
                        ItemSeparatorComponent={() => <View style={{width: 10}} />}
                    />
            </View>
        }
        {mytripSearchState.showInput &&
            <View 
            style={{ 
                width: '100%',
                paddingHorizontal: 10,
                marginTop: 10
             }}
            >
            <View
                style={[styles.inputContainer]}
                >
                <TextInput 
                    placeholder='Search Trips by Place'
                    placeholderTextColor={Colors.grayTone4}
                    value={mytripSearchState.inputValue}
                    onChangeText={(text) => dispatch((setInputValue(text)))}
                    style={[styles.input]}
                />
                {mytripSearchState.inputValue.length > 0 ?
                    <TouchableOpacity
                    onPress={() => dispatch((setInputValue('')))}
                    style={[styles.clearBtn]}
                    >
                        <Ionicons name="close" size={20} color={Colors.whiteTone1} />
                    </TouchableOpacity>
                    :
                    <Ionicons name="search" size={20} color={Colors.grayTone3} />
                }
            </View>
        </View>}
    </>
  )
}

export default SortBy;

const styles = StyleSheet.create({
    filterItem: {
        paddingVertical:5,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 2
    },
    filterItem_text : {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 12
    },
    inputContainer: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteTone1,
        borderColor: Colors.grayTone4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 5
    },
    input: {
        flex: 1,
        height: 30,
        color: Colors.grayTone1,
        fontFamily: 'Poppins_300Light',
        fontSize: 14,
    },
    clearBtn: {
        height:25,
        width: 25,
        borderRadius: 15,
        backgroundColor: Colors.grayTone3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});