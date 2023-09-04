import { StyleSheet, Text, View, Image, GestureResponderEvent, ImageSourcePropType, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';


interface CardResultSearchProps {
  onPress: (event: GestureResponderEvent) => void;
}

const CardResultSearch = (props: CardResultSearchProps) => {

  return (
    <TouchableOpacity  onPress={props.onPress} style={styles.container}>
        <View style={{ 
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
           }}>
          <View style={{ 
            flexDirection: "row",
            alignItems: "center"
           }}>
              <Image style={styles.image} resizeMode='contain' source={require('@assets/images/buca.jpeg')}></Image>
              <View style={{ marginLeft: 5 }}>
                  <Text style={styles.name}> Buca Voyage </Text>
                  <View style={{ 
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 3
                    }}>
                    <Ionicons
                      name="ios-star"
                      size={10}
                      color={Colors.accentYellow}
                      style={{ marginRight: 2 }}
                      />
                      <Ionicons
                      name="ios-star"
                      size={10}
                      color={Colors.accentYellow}
                      style={{ marginRight: 2 }}
                      />
                      <Ionicons
                      name="ios-star"
                      size={10}
                      color={Colors.accentYellow}
                      style={{ marginRight: 2 }}
                      />
                      <Ionicons
                      name="ios-star"
                      size={10}
                      color={Colors.accentYellow}
                      style={{ marginRight: 2 }}
                      />
                      <Ionicons
                      name="ios-star"
                      size={10}
                      color={Colors.grayTone3}
                      style={{ marginRight: 2 }}
                      />
                  </View>
              </View>
              
          </View>
          <Text style={styles.price}>
              XFA 500
          </Text>
        </View>
        <View style={{ 
              flexDirection: "row",
              alignItems: "stretch",
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
          <View style={{ 
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "flex-end",
            justifyContent: "space-between",
           }}>
              <View style={{ 
                flexDirection: "row",
                alignItems: "center",
              }}>
                <Text style={{ 
                            fontSize: 16,
                            fontFamily: 'Poppins_600SemiBold',
                            color: Colors.grayTone1,
                            marginRight: 3,
                          }}>4</Text>
                <Ionicons
                    name="people"
                    size={25}
                    color={Colors.grayTone1}
                  /> 
              </View>
              <View>
              <View style={{ 
                flexDirection: "row",
                alignItems: "center",
                
                flexWrap: "wrap",
                overflow: "hidden",
                width: "100%"
              }}>
                

                <Ionicons
                    name="musical-notes"
                    size={15}
                    color={Colors.grayTone2}
                  />
                  <Ionicons
                    name="wifi"
                    size={15}
                    color={Colors.grayTone2}
                  />
                  <Ionicons
                    name="ios-logo-no-smoking"
                    size={15}
                    color={Colors.grayTone2}
                  />
              </View>
              <View style={{ 
                flexDirection: "row",
                alignItems: "center",
                
                flexWrap: "wrap",
                overflow: "hidden",
                width: "100%"
              }}>
                

                <Ionicons
                    name="snow"
                    size={15}
                    color={Colors.grayTone2}
                  />
                  <Ionicons
                    name="pizza"
                    size={15}
                    color={Colors.grayTone2}
                  />
                  <Ionicons
                    name="tv"
                    size={15}
                    color={Colors.grayTone2}
                  />
              </View>
              </View>
          </View>
        </View>
    </TouchableOpacity>
  );
};

export default CardResultSearch;

const styles = StyleSheet.create({
    container: {
        shadowColor: '#171717',
        elevation: 4,
        backgroundColor: Colors.whiteTone2,
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