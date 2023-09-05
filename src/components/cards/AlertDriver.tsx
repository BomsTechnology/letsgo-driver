import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";

export interface AlertDriverProps {
  image?: ImageSourcePropType;
  title: string;
  id: string;
  description: string;
  type: string;
}
//

const AlertDriver = ({ props }: { props: AlertDriverProps }) => {

  const getColor = () => {
    switch (props.type) {
      case "GOOD":
        return Colors.accentGreen;
      case "WARNING":
        return Colors.accentOrange;
      case "INFO":
        return Colors.primaryColor;
      default:
        return Colors.grayTone3;
    }
  }

  return (
    <View style={[styles.container, { borderColor: getColor() }]}>
      <TouchableOpacity style={styles.inner}>
        <View style={styles.content}>
          {props.image ? <Image source={props.image} resizeMode="contain" style={styles.image} /> :
            <View style={styles.image}>
              <Ionicons name="information" size={30} color={Colors.primaryColor} />
            </View>
          }
          <View>
            <Text style={[styles.name]}>{ props.title }</Text>
            <Text style={[styles.text]}>
              {props.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.ctnCloseBtn}>
        <TouchableOpacity
          style={[styles.shadowProp, styles.closeBtn]}
          onPress={() => null}
        >
          <Ionicons name="close" size={15} color={Colors.secondaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlertDriver;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteTone2,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    position: "relative",
    flexDirection: "row",
  },
  inner: {
    maxWidth: "90%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  text: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
  },
  name: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
  shadowProp: {
    shadowColor: "#171717",
    elevation: 4,
  },
  ctnCloseBtn: {
    width: "10%", 
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  closeBtn: {
    backgroundColor: Colors.primaryColor,
    height: 20,
    width: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: Colors.whiteTone1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
