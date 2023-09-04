import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Divider } from '../../constants/ComponentStyled';
import Colors from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';

const TripDetailTable = () => {
  return (
    <View style={[styles.container]}>
        
        <View style={styles.containerItem}>
            <View style={[styles.item]}>
                <Text style={[styles.description,{ textAlign: 'left'}]}>Reserved item</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.description,{ textAlign: 'center'}]}>Unit price (xaf)</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.description,{ textAlign: 'center'}]}>quantity</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.description,{ textAlign: 'right'}]}>Total</Text>
            </View>
        </View>
        <Divider style={{marginVertical: 10}}/>
        <View style={styles.containerItem}>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'left'}]}>Seat N°1</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>250</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>-</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'right'}]}>250</Text>
            </View>
        </View>
        <View style={styles.containerItem}>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'left'}]}>Seat N°2</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>250</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>-</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'right'}]}>250</Text>
            </View>
        </View>
        <View style={styles.containerItem}>
            <View style={[styles.item, {alignItems: 'center', flexDirection: 'row', justifyContent:'center', gap: 5}]}>
            <Text style={[styles.paragrah,{ textAlign: 'center'}]}>Cnft: </Text>
            <Ionicons
                    name="wifi"
                    size={20}
                    color={Colors.grayTone2}
                  />
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>250</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>1</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'right'}]}>250</Text>
            </View>
        </View>
        <View style={styles.containerItem}>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'left'}]}>Luggage</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>100</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>8kg</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'right'}]}>800</Text>
            </View>
        </View>
        <View style={styles.containerItem}>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'left'}]}>Promo</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>- 500</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>1</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'right'}]}>-500</Text>
            </View>
        </View>
        <Divider style={{marginVertical: 10}}/>
        <Text style={[styles.description, {textAlign: 'right'}]}>Total Trip Budget</Text>
        <Text style={[styles.title, {textAlign: 'right'}]}>XAF 1350</Text>
        <Divider style={{marginBottom: 10}}/>
    </View>
  );
};

export default TripDetailTable;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 20
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        color: Colors.grayTone1,
    },
    paragrah: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        color: Colors.grayTone1,
    },
    description: {
        fontFamily: 'Poppins_300Light',
        color: Colors.grayTone2,
        textTransform: 'uppercase',
        fontSize: 14,
    },
    containerItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    item: {
        width: '24%'
    }
});