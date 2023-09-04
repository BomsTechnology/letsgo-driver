import { Modal, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '@components/buttons/IconButton';
import { SeatBoxYellow, SeatBoxWhite, SeatBoxGreen, SeatBoxGray } from '@constants/ComponentStyled';
import CustomButton from '@components/buttons/CustomButton';
const { width, height } = Dimensions.get('window');
import {useForm, FieldValues} from 'react-hook-form';
import CustomInput from '@components/inputFields/CustomInput';

interface PersonnalVehiculeModalProps {
    modalVisible: boolean;
    setModalVisible: Function;
}

const AddPromoCodeModal = ({modalVisible, setModalVisible}: PersonnalVehiculeModalProps) => {
    
    const {
        control,
        handleSubmit,
        watch,
        //formState: {errors},
      } = useForm();
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
            <Text style={[styles.boldText,  {alignSelf: 'center', width: width *0.8, position: 'absolute', top: 30,}]}>Add Promo Code or Luggage</Text>
            <View style={{right: 10, position: 'absolute', top: 30,}}><IconButton bgColor={Colors.secondaryColor} icon={closeIcon} onPress={() => setModalVisible(false)}/></View>
            <View style={{ 
                position: 'relative',
                width: '90%'
             }}>
                <Text style={styles.description}>Promo Code</Text>
                <CustomInput
                    placeholder=""
                    name="promocode"
                    control={control}
                    secureTextEntry={false}
                    bgColor='#fff'
                    rules={{
                    required: 'The Promo Code is required',
                    }}
                    />
                    <Text style={styles.description}>Number of seat on the promo code</Text>
                <CustomInput
                    placeholder=""
                    name="nbseat"
                    control={control}
                    secureTextEntry={false}
                    bgColor='#fff'
                    rules={{
                    required: 'The Number seat is required',
                    }}
                    />
                <Text style={styles.description}>Seat ID</Text>
                <CustomInput
                    placeholder=""
                    name="seatid"
                    keyboardType='numeric'
                    control={control}
                    secureTextEntry={false}
                    bgColor='#fff'
                    rules={{
                    required: 'The Seat ID is required',
                    }}
                    />
                <Text style={[styles.boldText, {textTransform: 'uppercase',marginTop: 15}]}>or</Text>
                <Text style={styles.description}>Luggage Size (kg)</Text>
                <CustomInput
                    placeholder=""
                    name="luggage"
                    control={control}
                    secureTextEntry={false}
                    keyboardType='numeric'
                    bgColor='#fff'
                    rules={{
                    required: 'The luggage is required',
                    }}
                    />
                <CustomButton 
                    bgColor={Colors.primaryColor}
                    fgColor='#fff'
                    isReady={true}
                    onPress={() => {}}
                    text="Add"
                    marginVertical={20}
                />
            </View>
        </View>
    </Modal>
  );
};

export default AddPromoCodeModal;

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
        textAlign: 'center',
        
    },
    image: {
        width: 300,
        height: 500,
    },
    description: {
        fontFamily: 'Poppins_300Light',
        textAlign: 'left',
        color: Colors.grayTone4,
        fontSize: 16,
        marginHorizontal: 5,
        marginTop: 15
    },
});