import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import PromoCodeTable from './table/PromoCodeTable'
import CustomButton from './buttons/CustomButton'
import Colors from '@constants/colors'
import AddPromoCodeModal from './modal/AddPromoCodeModal'

const PromoCodeLuggage = () => {
    const [modalVisibleP, setModalVisibleP] = useState(false);
  return (
    <>
        <AddPromoCodeModal modalVisible={modalVisibleP} setModalVisible={setModalVisibleP} />
        <View style={[styles.container]}>
        <Text style={[styles.hText]}>Any Discount ? Any Luggage ?</Text>
        <PromoCodeTable/>
        <CustomButton 
                bgColor={Colors.grayTone4}
                fgColor={Colors.grayTone1}
                isReady={true}
                onPress={() => setModalVisibleP(!modalVisibleP)}
                text="add a promo code or luggage"
                marginVertical={10}
            />
        </View>
    </>
  )
}

export default PromoCodeLuggage

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10
    },
    hText: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        color: Colors.secondaryColor,
        textAlign: 'left',
        width: '100%'
    }
})