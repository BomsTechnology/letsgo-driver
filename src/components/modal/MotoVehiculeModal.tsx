import { Modal, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '@components/buttons/IconButton';
import { SeatBoxYellow, SeatBoxWhite, SeatBoxGreen, SeatBoxGray } from '@constants/ComponentStyled';
const { width, height } = Dimensions.get('window');

interface MotoVehiculeModalProps {
    modalVisible: boolean;
    setModalVisible: Function;
}

const MotoVehiculeModal = ({modalVisible, setModalVisible}: MotoVehiculeModalProps) => {
    const closeIcon = (<Ionicons
        name="close"
        size={20}
        color={Colors.whiteTone1}
        /> );
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
    setModalVisible(!modalVisible);
    }}
>
<View style={[styles.container]}>
    <Text style={[styles.boldText,  {alignSelf: 'center', width: width *0.8, position: 'absolute', top: 30,}]}>Moto Vehicule</Text>
    <View style={{right: 10, position: 'absolute', top: 30,}}><IconButton bgColor={Colors.secondaryColor} icon={closeIcon} onPress={() => setModalVisible(false)}/></View>
    <View style={{ 
        position: 'relative'
     }}>
        <Image resizeMode='contain' style={[styles.image]} source={require('@assets/images/vehicules/moto.png')} />
        <TouchableOpacity style={[{
            left: '50%',
            bottom: 165,
            position: 'absolute',
        }]}>
            <SeatBoxGreen>2</SeatBoxGreen>
        </TouchableOpacity>
        <TouchableOpacity style={[{
            left: '50%',
            bottom: 230,
            position: 'absolute',
        }]}>
            <SeatBoxGray>1</SeatBoxGray>
        </TouchableOpacity>
    </View>
</View>
</Modal>
  );
};

export default MotoVehiculeModal;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    boldText: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: Colors.whiteTone1,
        textAlign: 'center'
    },
    image: {
        width: 400,
        height: 600,
        transform: [{rotate: '-90deg'}],
    },
});