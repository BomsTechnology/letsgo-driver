import { StyleSheet, Text, View, Modal, Dimensions, ImageSourcePropType, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@constants/colors';
const { width, height } = Dimensions.get('window');
import {Ionicons} from '@expo/vector-icons';
import IconButton from '@components/buttons/IconButton';
import ImageCard, { ImageCardProps } from '@components/cards/ImageCard';


interface ImageSliderModalProps {
    modalVisible: boolean;
    setModalVisible: Function;
    images: string[]
}

const ImageSliderModal = ({modalVisible, setModalVisible, images}: ImageSliderModalProps) => {
    
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
            <Text style={[styles.boldText,  {alignSelf: 'center', width: width *0.8, position: 'absolute', top: 30,}]}>Vehicule Image preview</Text>
           <View style={{right: 10, position: 'absolute', top: 30,}}><IconButton bgColor={Colors.secondaryColor} icon={closeIcon} onPress={() => setModalVisible(false)}/></View>
        
        <View style={[{width: width *0.8, borderRadius: 20, overflow: 'hidden'}]}>
            <FlatList
                data={images}
                horizontal
                showsHorizontalScrollIndicator={true}
                renderItem={({item}: {item: string}) => <ImageCard image={item} />}
                keyExtractor={(item, i)=> i.toString()}
                style={{
                    backgroundColor: Colors.whiteTone1
                }}
            />
        </View>
        </View>
        </Modal>
    );
};

export default ImageSliderModal;

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
    }
});