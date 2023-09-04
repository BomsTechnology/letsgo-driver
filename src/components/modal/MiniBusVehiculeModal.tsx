import { Modal, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '@components/buttons/IconButton';
import { SeatBoxYellow, SeatBoxWhite, SeatBoxGreen, SeatBoxGray } from '@constants/ComponentStyled';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

interface MiniBusVehiculeModalProps {
    modalVisible: boolean;
    setModalVisible: Function;
}

interface fakeType {
    id: string;
    value: string;
}

const MiniBusVehiculeModal = ({modalVisible, setModalVisible}: MiniBusVehiculeModalProps) => {
    const closeIcon = (<Ionicons
        name="close"
        size={20}
        color={Colors.whiteTone1}
        /> );

    const data = new Array(104).fill({value:'1'});

    const renderItem = ({item}: {item: fakeType}) => 
                        <TouchableOpacity style={{ 
                            marginHorizontal: 5,
                            marginBottom: 15,
                         }}>
                            <SeatBoxYellow style={{ 
                                width: ((width * 0.8)  / 4 )- 15,
                             }}>
                                {item.value}
                             </SeatBoxYellow>
                        </TouchableOpacity>;
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
    setModalVisible(!modalVisible);
    }}
>
<View style={[styles.container]} >
    <Text style={[styles.boldText,  {alignSelf: 'center', width: width *0.8, position: 'absolute', top: 30,}]}>Mini Bus Vehicule</Text>
    <View style={{right: 10, position: 'absolute', top: 30,}}><IconButton bgColor={Colors.secondaryColor} icon={closeIcon} onPress={() => setModalVisible(false)}/></View>

    <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index)=>`${index}`}
        key={4}
        numColumns={4}
        style={{ 
            backgroundColor: Colors.grayTone4,
            borderRadius: 20,
            width: width * 0.8,
            paddingHorizontal: 10,
            paddingTop: 10,
            paddingBottom: 150
         }}
    />
</View>
</Modal>
  );
};

export default MiniBusVehiculeModal;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: 80,
        paddingBottom: 10,
        
    },
    boldText: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: Colors.whiteTone1,
        textAlign: 'center'
    },
    image: {
        width: "100%",
        height: "100%",
        transform: [{rotate: '90deg'}],
    },
});