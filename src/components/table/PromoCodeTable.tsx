import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';

interface SeatTableProps {
  withStatus?: boolean;
}

const PromoCodeTable = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={[styles.boldText, styles.item,  styles.item_3 ]}>P. Code</Text>
        <Text style={[styles.boldText, styles.item,  styles.item_3]}>Seat Num.</Text>
        <Text style={[styles.boldText, styles.item,  styles.item_3]}>Seat ID</Text>
      </View>
      <View style={[styles.bodyContent]}>
        <View style={[styles.item,   styles.item_3]}>
            <Text style={[styles.semiBoldText]}>24RU87</Text>
        </View>
        <View style={[styles.item,  styles.item_3]}>
        <Text style={[styles.semiBoldText]}>1</Text>
        </View>
        <View style={[styles.item,  styles.item_3]}>
        <Text style={[styles.semiBoldText]}>1</Text>
        </View>
      </View>

    </View>
  );
};

export default PromoCodeTable;

const styles = StyleSheet.create({
    container: {
        width: '85%',
        marginVertical: 10
    },
    header: {
        backgroundColor: Colors.secondaryColor,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bodyContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.grayTone4,
        padding: 10
    },
    status: {
      fontSize: 10,
      fontFamily: 'Poppins_500Medium',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20
    },
    status_unreserved: {
      backgroundColor: Colors.whiteTone4,
      color: Colors.grayTone1
    },
    status_taken: {
      backgroundColor: Colors.lightPrimary,
      color: Colors.primaryShade2
    },
    status_noseat: {
      backgroundColor: Colors.whiteTone3,
      color: Colors.grayTone3
    },
    item: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase'
    },
    item_3: {
      width: '33%',
    },
    item_4: {
      width: '25%',
    },
    boldText: {
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
        color: Colors.grayTone1
      },
    semiBoldText: {
      fontSize: 13,
      fontFamily: 'Poppins_600SemiBold',
      color: Colors.grayTone1
    },
    mediumText: {
      fontSize: 14,
      fontFamily: 'Poppins_500Medium',
      color: Colors.grayTone1
    },
});