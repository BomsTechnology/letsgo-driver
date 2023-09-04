import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';

interface SeatTableProps {
  withStatus?: boolean;
}

const SeatTable = ({withStatus}: SeatTableProps) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={[styles.boldText, styles.item, withStatus ? styles.item_4 : styles.item_3 ]}>Num</Text>
        <Text style={[styles.boldText, styles.item, withStatus ? styles.item_4 : styles.item_3]}>Conforts</Text>
        <Text style={[styles.boldText, styles.item, withStatus ? styles.item_4 : styles.item_3]}>Extra Price</Text>
        {withStatus && <Text style={[styles.boldText, styles.item, styles.item_4]}>Status</Text>}
      </View>
      <View style={[styles.bodyContent]}>
        <View style={[styles.item, withStatus ? styles.item_4 : styles.item_3]}>
            <Text style={[styles.semiBoldText]}>1</Text>
        </View>
        <View style={[styles.item, withStatus ? styles.item_4 : styles.item_3]}></View>
        <View style={[styles.item, withStatus ? styles.item_4 : styles.item_3]}>
            <Text style={[styles.semiBoldText]}>XFA 300</Text>
        </View>
        {withStatus && <View style={[styles.item, styles.item_4]}>
            <Text style={[styles.status, styles.status_noseat]}>Status</Text>
        </View>}
      </View>

    </View>
  );
};

export default SeatTable;

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
        alignItems: 'center'
    },
    item_3: {
      width: '33%',
    },
    item_4: {
      width: '25%',
    },
    boldText: {
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
        color: Colors.grayTone1
      },
    semiBoldText: {
      fontSize: 14,
      fontFamily: 'Poppins_600SemiBold',
      color: Colors.grayTone1
    },
    mediumText: {
      fontSize: 14,
      fontFamily: 'Poppins_500Medium',
      color: Colors.grayTone1
    },
});