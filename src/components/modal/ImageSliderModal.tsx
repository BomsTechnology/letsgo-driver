import { StyleSheet, Text, View, Modal, Dimensions, ImageSourcePropType, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@constants/colors';
const { width, height } = Dimensions.get('window');
import {Ionicons} from '@expo/vector-icons';
import IconButton from '@components/buttons/IconButton';

interface slideImageProps {
    id: string;
    image: ImageSourcePropType;
}

interface ImageSliderModalProps {
    modalVisible: boolean;
    setModalVisible: Function;
}

const ImageSliderModal = ({modalVisible, setModalVisible}: ImageSliderModalProps) => {
    
    const closeIcon = (<Ionicons
        name="close"
        size={20}
        color={Colors.whiteTone1}
        /> );


    const images: slideImageProps[] = [
        {
            "id": "1",
            "image": require("@assets/images/redYaris.jpg")
        },
        {
            "id": "2",
            "image": require("@assets/images/redYaris2.jpg")
        },
        {
            "id": "3",
            "image": require("@assets/images/redYaris3.jpg")
        }
    ];

    const renderItem = ({ item }: {item : slideImageProps}) =>{
        return (
          
            <Image
             source={ item.image}
             resizeMode='cover'
             style={{
              height: 300,
              width:  width *0.8,
             }}
            />
        )
      }

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
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={true}
                renderItem={renderItem}
                keyExtractor={(item)=>item.id}
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