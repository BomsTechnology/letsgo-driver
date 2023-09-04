import { StyleSheet, Text, View, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

interface TicketCardProps {
  onPress: (event: GestureResponderEvent) => void;
}

const TicketCard = (props: TicketCardProps) => {
  
  return (

    <TouchableOpacity onPress={props.onPress} style={[styles.container]}>
        <View style={[styles.topBlock, styles.shadowProp]}>

          <View style={{ 
              flexDirection: "row",
              alignItems: "center",
              width: "100%"
            }}>
                <View style={{ 
                    justifyContent: 'center',
                    alignItems: 'center'
                 }}>
                    <Ionicons
                        name="time-outline"
                        size={20}
                        color={Colors.accentOrange}
                        /> 
                    <Text style={[styles.title,]}>
                        00h40
                    </Text>
                </View>
              
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
                        <Text style={[styles.title,]}>Biyem-Assi</Text>
                        <Text style={[styles.description,]}>7:00, Today</Text>
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
                        <Text style={[styles.title,]}>Melen, Ecole Polytechnique</Text>
                        <Text style={[styles.description,]}>7:00, Today</Text>
                      </View>
                </View>
              </View>            
          </View>

          <View style={[{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5
          }]}>
            <View >
                <Text
                    style={[{ 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        },
                        styles.description,
                    ]}
                >Passager Name</Text>
                <Text
                style={[{ 
                    textAlign: 'left'
                    },
                    styles.title,
                ]}
                >Karlin Becker</Text>
            </View>

            <View >
                <Text
                style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                    },
                    styles.description,
                ]}
                >Confirmation ID</Text>
                <Text
                    style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                     }, 
                     styles.title,
                    ]}
                >48312995</Text>
            </View>
          </View>

        </View>

        <View style={[styles.bottomBlock, styles.shadowProp]}>
            <View style={[styles.containerImage]}>
                <Image
                    resizeMode='cover'  
                    source={require('@assets/images/visamastercard.jpg')} 
                    style={[styles.image]} 
                    />
            </View>
            <View >
                <Text
                    style={[{ 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        },
                        styles.description,
                    ]}
                >seat number</Text>
                <Text
                style={[{ 
                    textAlign: 'right'
                    },
                    styles.title,
                ]}
                >1</Text>
            </View>

            <View >
                <Text
                style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                    },
                    styles.description,
                ]}
                >total budget</Text>
                <Text
                    style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                     }, 
                     styles.title,
                    ]}
                >XAF 550</Text>
            </View>
        </View>
    </TouchableOpacity>
    
  );
};

export default TicketCard;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    topBlock: {
        width: "100%",
        backgroundColor: Colors.whiteTone1,
        borderRadius: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderBottomColor: Colors.grayTone1,
    },
    bottomBlock: {
        width: "100%",
        backgroundColor: Colors.whiteTone1,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderStyle: 'dashed',
        borderTopColor: Colors.grayTone1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: Colors.grayTone1,
      },
      description: {
        fontFamily: 'Poppins_300Light',
        color: Colors.grayTone1,
        fontSize: 12,
    
      },
      paragraph: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium'
      },
      containerImage: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        overflow: 'hidden',
        alignSelf: 'center'
      },
      image: {
        width: "100%",
        height: "100%"
      },
      shadowProp: {
        shadowColor: Colors.primaryColor,
        elevation: 2,
        backgroundColor: Colors.whiteTone1,
      },
});