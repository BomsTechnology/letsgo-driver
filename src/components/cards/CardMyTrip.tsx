import { StyleSheet, Text, View, Image, GestureResponderEvent, ImageSourcePropType, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';


interface CardMyTripProps {
  onPress: (event: GestureResponderEvent) => void;
}

const CardMyTrip = (props: CardMyTripProps) => {

  return (
    <TouchableOpacity  onPress={props.onPress} style={styles.container}>
        <View style={{ 
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
          <View style={{ 
              flexDirection: "row",
              alignItems: "center",
              width: "80%",
            }}>
              <Text style={{ 
                        fontSize: 13,
                        fontFamily: 'Poppins_600SemiBold',
                        color: Colors.grayTone1
                      }}>
                00h40
              </Text>
              <View style={{ 
                    marginLeft: 15,
                    position: "relative",
                  }}>
                    <Ionicons
                        name="ios-ellipsis-vertical"
                        size={20}
                        color={Colors.primaryColor}
                        style={{ 
                          position: "absolute", 
                          bottom:40,
                          left:0
                        }}
                        /> 
                        <Ionicons
                        name="ios-ellipsis-vertical"
                        size={20}
                        color={Colors.primaryColor}
                        style={{ 
                          position: "absolute", 
                          top:20,
                          left:0
                        }}
                        /> 
                <View style={{ 
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}>
                    <Ionicons
                        name="locate"
                        size={20}
                        color={Colors.primaryColor}
                        /> 
                      <View style={{ marginLeft: 5 }}>
                        <Text style={{ 
                          fontSize: 13,
                          fontFamily: 'Poppins_600SemiBold',
                          color: Colors.grayTone1
                        }}>Biyem-Assi</Text>
                        <Text style={{ 
                          fontSize: 12,
                          fontFamily: 'Poppins_300Light',
                          color: Colors.grayTone3
                        }}>7:00, Today</Text>
                      </View>
                </View>
                <View style={{ 
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginTop: 20
                  }}>
                    <Ionicons
                        name="location-outline"
                        size={20}
                        color={Colors.secondaryColor}
                        /> 
                      <View style={{ marginLeft: 5 }}>
                        <Text style={{ 
                          fontSize: 13,
                          fontFamily: 'Poppins_600SemiBold',
                          color: Colors.grayTone1
                        }}>Melen, Ecole Polytechnique</Text>
                        <Text style={{ 
                          fontSize: 12,
                          fontFamily: 'Poppins_300Light',
                          color: Colors.grayTone3
                        }}>7:00, Today</Text>
                      </View>
                </View>
              </View>            
          </View>
          
          <Text style={styles.price}>
              XFA 500
          </Text>
        </View>
        <View style={{ 
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 10,
            gap: 20,
           }}>
          
          <View style={{ 
                flexDirection: "row",
                alignItems: "center",
              }}>
                <FontAwesome5
                    name="weight-hanging"
                    size={15}
                    color={Colors.grayTone1}
                  />
                  <Text style={{ 
                            fontSize: 14,
                            fontFamily: 'Poppins_600SemiBold',
                            color: Colors.grayTone1,
                            marginLeft: 3,
                          }}>0Kg</Text>
              </View>
              <View style={{ 
                flexDirection: "row",
                alignItems: "center",
              }}>
                <Text style={{ 
                            fontSize: 14,
                            fontFamily: 'Poppins_600SemiBold',
                            color: Colors.grayTone1,
                            marginRight: 3,
                          }}>4</Text>
                <Ionicons
                    name="people"
                    size={20}
                    color={Colors.grayTone1}
                  /> 
              </View>
        </View>
        <View style={{ 
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            gap: 20,
           }}>
          
          <View style={{ 
                flexDirection: "row",
                alignItems: "center",
              }}>
                  <Text style={{ 
                            fontSize: 14,
                            fontFamily: 'Poppins_500Medium',
                            color: Colors.grayTone1,
                            marginRight: 3,
                          }}>Service: </Text>
                  <Text style={{ 
                            fontSize: 14,
                            fontFamily: 'Poppins_600SemiBold',
                            color: Colors.grayTone1,
                            marginLeft: 3,
                          }}>Moto - Normal</Text>
              </View>
              <View style={{ 
                backgroundColor: Colors.lightPrimary,
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 2
              }}>
                <Text style={{ 
                            fontSize: 12,
                            fontFamily: 'Poppins_500Medium',
                            color: Colors.grayTone1,
                            marginRight: 3,
                          }}>Suscriber</Text>
              </View>
        </View>
    </TouchableOpacity>
  );
};

export default CardMyTrip;

const styles = StyleSheet.create({
    container: {
        shadowColor: '#171717',
        elevation: 4,
        backgroundColor: Colors.whiteTone1,
        borderRadius: 10,
        padding:10,
        width: "100%",
        overflow: "hidden",
        marginBottom: 10
      },
    image: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      borderWidth: 0.5,
      borderColor: Colors.grayTone4,
    },
    name: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 14,
      color: Colors.grayTone1
    },
    price: {
      color: Colors.secondaryColor,
      fontFamily: 'Poppins_300Light',
      fontSize: 18,
    }
});