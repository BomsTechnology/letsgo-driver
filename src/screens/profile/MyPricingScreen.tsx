/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import CheckboxField from '@components/inputFields/CheckboxField';
import CustomInput from '@components/inputFields/CustomInput';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { Text, View, ScrollView, Modal, Alert } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useForm, useWatch } from "react-hook-form";
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@constants/colors';
import Button from '@components/buttons/Button';
import SimpleHeader from '@components/SimpleHeader';
import { DriverPricing } from '@mytypes/TimeTableProps';
import AddPricingModal from '@components/modal/AddPricingModal';
import { RootState, useAppSelector } from '@store/store';

interface IItem {
    title?: string;
    elemnt?: JSX.Element;
    account?: string;
    id: string;
    action?: Function;
}

const PaymentMethod = ({method}: {method: IItem}) => {
    return (
        <Pressable onPress={() => { method.action ? method.action() : null}}>
            <View style={
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 120,
                    width: 120,
                    borderWidth: 1,
                    borderColor: '#efefef',
                    borderRadius: 8,
                }
            }>
                {method.title && <Text style={{fontFamily: 'Poppins_600SemiBold'}}>{method.title}</Text>}
                {method.account && <Text style={{fontFamily: 'Poppins_500Medium'}}>{method.account}</Text>}
                {method.elemnt && method.elemnt}
            </View>
        </Pressable>
    )
}

const MyPricingScreen = () => {
  const { handleSubmit, control, watch } = useForm();
  const driverState = useAppSelector((state: RootState) => state.driver);
  const [newItem, setNewItem] = useState<IItem | null>();
  const [pricing, setPricing] = React.useState<DriverPricing>(
    driverState.driver!.driverPricing!
  );
  const [paymentsMethods, setPayMentMethods] = useState<IItem []>([{
    id: '0',
    elemnt: <Ionicons name="add" size={20} />,
    action: () => {setModal2Visible(true)},
  }]);
  
  let paymentMethodName = watch("paymentMethodName");
  let paymentMethodNumber = watch("paymentMethodNumber");
 
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  return (
    <>
    <AddPricingModal
        modalVisible={modalVisible}
        pricing={pricing}
        setPricing={setPricing}
        setModalVisible={setModalVisible}
      />
        <SafeAreaView style={{flex:1}}>
            <View style={{padding: 20}}>
                <SimpleHeader text='My Pricing' />
            </View>
            <View style={{flex:1}}>
                <ScrollView nestedScrollEnabled contentContainerStyle={{
                    paddingHorizontal: 12,
                    width: '100%',
                    height: '100%'
                }}>
                    <View style={{paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, elevation: 5, marginVertical: 4, backgroundColor: '#fff'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                            <Text style={{fontSize: 20, fontFamily: 'Poppins_600SemiBold'}}>Facturation</Text>
                            <Button onPress={() => setModalVisible(true)}>
                                <AntDesign name="edit" color={Colors.primaryColor} size={20} />
                            </Button>
                        </View>
                        <View style={{width: '100%', marginTop: 18}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 8}}>
                                <Text style={{fontFamily: 'Poppins_500Medium'}}>Par Heure</Text>
                                <Text style={{fontFamily: 'Poppins_400Regular'}}>{driverState.driver?.driverPricing?.pricePerHour ? driverState.driver?.driverPricing?.pricePerHour : '0'} { driverState.driver?.driverPricing?.currency ? driverState.driver?.driverPricing?.currency : 'XAF'}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 8}}>
                                <Text style={{fontFamily: 'Poppins_500Medium'}}>Par Jour</Text>
                                <Text style={{fontFamily: 'Poppins_400Regular'}}>{driverState.driver?.driverPricing?.pricePerDay ? driverState.driver?.driverPricing?.pricePerHour : '0'} { driverState.driver?.driverPricing?.currency ? driverState.driver?.driverPricing?.currency : 'XAF'}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 8}}>
                                <Text style={{fontFamily: 'Poppins_500Medium'}}>Au Kilometre</Text>
                                <Text style={{fontFamily: 'Poppins_400Regular'}}>{driverState.driver?.driverPricing?.pricePerKilometer ? driverState.driver?.driverPricing?.pricePerHour : '0'} { driverState.driver?.driverPricing?.currency ? driverState.driver?.driverPricing?.currency : 'XAF'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#fff', elevation: 5, borderRadius: 12, marginVertical: 8}}>
                        <Text style={{fontSize: 20, fontFamily: 'Poppins_600SemiBold'}}>Methodes de Payement</Text>
                        <View style={
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 4,
                                padding: 8,
                            }
                        }>
                            <FlatList
                                data={paymentsMethods}
                                keyExtractor={(item: {
                                    title?: string;
                                    elemnt?: JSX.Element;
                                    id: string;
                                    action?: Function;
                                }) => String(item.id)}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: 8,
                                }}
                                renderItem={item => {
                                    return <PaymentMethod method={item.item} />;
                                }}
                            />
                        </View>
                    </View>

                    {/*<View style={{paddingVertical: 15, paddingHorizontal: 12, width: '100%', backgroundColor: '#fff', elevation: 5, borderRadius: 12, marginVertical: 8}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                            <Text style={{fontSize: 20, fontFamily: 'Poppins_600SemiBold'}}>Langues</Text>
                            <Ionicons name='pencil' size={20} />
                        </View>
                        <View style={{width: '100%', marginTop: 24, gap: 8}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', gap: 12}}>
                                <View style={{height: 25, width: 45, borderRadius: 4, backgroundColor: 'blue'}}/>
                                <Text style={{fontFamily: 'Poppins_400Regular'}}>Francais</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', gap: 12}}>
                                <View style={{height: 25, width: 45, borderRadius: 4, backgroundColor: 'red'}}/>
                                <Text style={{fontFamily: 'Poppins_400Regular'}}>Anglais</Text>
                            </View>
                        </View>
                            </View>*/}
                    
                </ScrollView>
            </View>
        </SafeAreaView>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal2Visible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
        }}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, {backgroundColor: Colors.whiteTone1, height: '55%'}]}>
                    <View style={{
                        backgroundColor: Colors.accentOrange,
                        width: '100%',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 12,
                        paddingVertical: 2
                    }}>
                        <Text style={{fontSize: 20, fontFamily: 'Poppins_700Bold', color: '#fff'}}>Methode de Payement</Text>
                        <Button onPress={() => setModal2Visible(!modal2Visible)}>
                            <Ionicons name='close' size={18} color={'#fff'}/>
                        </Button>
                    </View>
                    <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: '100%'}}>
                            <Text style={{fontSize: 16, fontFamily: 'Poppins_500Medium', marginHorizontal: 12, marginTop: 12}}>Methode de Payement:</Text>
                        </View>
                        <ScrollView contentContainerStyle={{width: '100%', paddingHorizontal: 12}}>
                            <View style={styles.input}>
                                <CustomInput bgColor='#fff' control={control} name='paymentMethodName' placeholder='Methode de payement' />
                            </View>
                            <View style={{width: '100%'}}>
                                <Text style={{fontSize: 16, fontFamily: 'Poppins_500Medium', marginHorizontal: 12, marginTop: 12}}>Numero du compte:</Text>
                                <View style={styles.input}>
                                    <CustomInput bgColor='#fff' keyboardType='numeric' control={control} name='paymentMethodNumber' placeholder='Numero du compte' />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', gap: 12, marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                                <Button
                                onPress={() => {
                                    paymentMethodName = ''
                                    paymentMethodNumber = ''
                                    return;
                                }}
                                style={{
                                    paddingHorizontal: 12,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 8,
                                    backgroundColor: '#ff0000',
                                }}>
                                    <Text style={{color: 'white', fontFamily: 'Poppins_400Regular'}}>Effacer</Text>
                                </Button>
                                <Button
                                onPress={() => {
                                    console.log(paymentMethodName)
                                    console.log(paymentMethodNumber)
                                    if (paymentMethodName && paymentMethodNumber){
                                        setNewItem({
                                            id: paymentsMethods.length.toString(),
                                            title: paymentMethodName,
                                            account: paymentMethodNumber
                                        })
                                    }
                                    setModal2Visible(!modal2Visible)
                                    return;
                                }}
                                style={{
                                    paddingHorizontal: 12,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 8,
                                    backgroundColor: Colors.primaryColor,
                                }}>
                                    <Text style={{color: 'white', fontFamily: 'Poppins_400Regular'}}>Enregistrer</Text>
                                </Button>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    </>
  );
};

export default MyPricingScreen;
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.whiteTone1
  },
  separator: {
    position: 'relative',
    width: '100%',
    height: 25,
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  centeredView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(3,3,3,0.5)'
  },
  modalView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    width: '100%',
    height: '64%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    marginVertical: 12,
    borderColor: '#afafaf',
    width: '100%'
  },
});
