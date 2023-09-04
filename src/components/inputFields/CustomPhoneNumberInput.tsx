import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, Dimensions, FlatList, ImageSourcePropType, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Ionicons} from '@expo/vector-icons';
import { countryCodeProps, countryCodes } from "@data/CountryCode"
import Colors from '@constants/colors';
import {Control, Controller} from 'react-hook-form';
const { width, height } = Dimensions.get('window');

interface CustomPhoneNumberInputProps {
  control: Control;
  name: string;
  placeholder: string;
  rules?: Object;
  selectedCountry?: countryCodeProps;
  setSelectedCountry?: Function;
  label?: string;
  labelColor?: string;
}


const CustomPhoneNumberInput = (props: CustomPhoneNumberInputProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedArea, setSelectedArea] = useState<countryCodeProps | undefined>(undefined);

    useEffect(() => {
      let initCountry = countryCodes.filter((country) => country.code === 'CM');
      setSelectedArea(initCountry[0]);
      props.setSelectedCountry!(initCountry[0]);
    }, [])

  
    const renderItem = ({ item }: {item : countryCodeProps}) =>{
        return (
          <TouchableOpacity
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={() =>{
              setSelectedArea(item),
              props.setSelectedCountry!(item),
              setModalVisible(false)
            }}
          >
            <Image
             source={ item.flag}
             resizeMode='cover'
             style={{
              height: 25,
              width: 40,
              marginRight: 10
             }}
            />
  
            <Text style={{fontSize: 14, fontFamily: 'Poppins_500Medium', color: Colors.grayTone1}}>{item.name}</Text>
          </TouchableOpacity>
        )
      }

  return (
    <>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
         <View
             style={{flex: 1, alignItems: "center", justifyContent: "center"}}
            >
                <View
                 style={[styles.shadowProp,{
                  height: 400,
                  width: width*0.8,
                  backgroundColor: Colors.whiteTone2,
                  borderRadius: 12,
                  paddingBottom: 20
                 }]}
                >
            <FlatList
                     data={countryCodes}
                     renderItem={renderItem}
                     keyExtractor={(item)=>item.code}
                     showsVerticalScrollIndicator={true}
                     style={{
                      paddingHorizontal: 20,
                      marginVertical:10
                     }}
                    />
          </View>
        </View>
      </Modal>
    <View style={styles.container}>
      { props.label ?  
        <Text style={{ 
                margin: 5, 
                fontFamily: 'Poppins_500Medium',
                color: props.labelColor ? props.labelColor : Colors.grayTone1,
          }}>
          {props.label}
        </Text> :
        <Text style={{ 
              margin: 5, 
              fontFamily: 'Poppins_500Medium',
              color: props.labelColor ? props.labelColor : Colors.grayTone1,
        }}>
          Phone Number
        </Text>
      }
      
            <Controller
              name={props.name}
              control={props.control}
              rules={props.rules}
              render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                      style={[
                        styles.shadowProp,
                        styles.boxCountry,
                        (error || (!error && !selectedArea)) ? styles.input_ERROR : styles.input_NORMAL,
                      ]}
                  >
                      <View style={{ justifyContent: 'center' }}>
                          <Ionicons
                          name="chevron-down-outline"
                          size={15}
                          color={Colors.grayTone3}
                          /> 
                      </View>
                      <View style={{ justifyContent: 'center', marginHorizontal: 8 }}>
                      <Image
                          source={ selectedArea?.flag!}
                          style={{
                          height: 10,
                          width: 15,
                          }}
                          />
                      </View>
                      <View style={{ justifyContent: 'center',  }}>
                          <Text style={{ fontSize: 16, color: Colors.grayTone1, fontFamily: 'Poppins_300Light' }}>{ selectedArea?.callingCode }</Text>
                      </View> 
                  </TouchableOpacity>
                    <TextInput 
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder={props.placeholder}
                      placeholderTextColor={Colors.grayTone3}
                      selectionColor={Colors.grayTone1}
                      keyboardType='numeric'
                      style={[
                        styles.shadowProp, 
                        styles.input,
                        (error || (!error && !selectedArea)) ? styles.input_ERROR : styles.input_NORMAL,
                      ]}
                    />
              </View>
              {error && (
                  <Text style={styles.text_ERROR}>{error.message || 'Error'}</Text>
                )}
                {(!error && !selectedArea) && (
                  <Text style={styles.text_ERROR}>{'Country Code is required'}</Text>
                )}
                </>
              )}
    />
    </View>
    
    </>
  );
};

export default CustomPhoneNumberInput;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    inputContainer: {
        paddingHorizontal:5,
        flexDirection: 'row'
    }, 
    boxCountry: {
      width: 100,
      height: 50,
      marginRight: 5,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
      borderWidth: 2,
    },
    shadowProp: {
      shadowColor: '#171717',
      elevation: 4,
      backgroundColor: Colors.whiteTone2,
      borderRadius: 10
    },
    input: {
      flex:1,
      height: 50,
      color: Colors.grayTone1,
      fontFamily: 'Poppins_300Light',
      fontSize: 16,
      paddingHorizontal: 8,
      borderWidth: 2,
    },
    input_NORMAL: {
      borderColor: Colors.whiteTone2
    },
    input_ERROR: {
      borderColor: 'red',
    },
    text_ERROR: {
      color: 'red',
      alignSelf: 'stretch',
      fontFamily: 'Poppins_300Light',
      fontSize: 12,
      margin: 5
    },
});