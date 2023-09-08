import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export interface ExperienceCardProps {
  title: string;
  id: string;
  description: string;
  start_date: string;
  end_date: string;
  attachements?: ImageSourcePropType[];
}

const ExperienceCard = ({ props }: { props: ExperienceCardProps }) => {
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "stretch" }}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.name]}>{props.title}</Text>
          <Text style={[styles.text]}>
            {props.start_date} - {props.end_date}
          </Text>
          <Text style={[styles.text]}>{props.description}</Text>
        </View>
        <View style={{ gap: 5 }}>
          <TouchableOpacity>
            <AntDesign name="edit" size={16} color={Colors.primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="trash-outline"
              size={17}
              color={Colors.accentOrange}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10, flexWrap: 'wrap' }}>
        {props.attachements &&
          props.attachements.map((image, i) => (
            <TouchableOpacity key={i} style={styles.image}>
              <Image
                source={image}
                resizeMode="contain"
                style={{ height: "100%", maxWidth: "100%" }}
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default ExperienceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteTone2,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    position: "relative",
  },
  text: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
  },
  name: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
  image: {
    height: 100,
    backgroundColor: Colors.whiteTone1,
    marginTop: 10,
    width: "30%",
    flexShrink:0,
    borderRadius: 10,
  },
});
