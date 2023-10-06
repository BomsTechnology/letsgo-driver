import {
  GestureResponderEvent,
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
import { DriverExperience } from "@mytypes/TimeTableProps";

const ExperienceCard = ({
  props,
  onDelete,
  onUpdate,
  onOpenSlider,
}: {
  props: DriverExperience;
  onDelete?: (event: GestureResponderEvent) => void;
  onUpdate?: (event: GestureResponderEvent) => void;
  onOpenSlider?: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "stretch" }}>
        <TouchableOpacity onPress={onUpdate} style={{ flex: 1 }}>
          <Text style={[styles.name]}>{props.label}</Text>
          <Text style={[styles.text]}>
            {`De ${props.startAt} à ${props.endAt}`}
          </Text>
          <Text style={[styles.text]}>{props.desc}</Text>
        </TouchableOpacity>
        <View style={{ gap: 5 }}>
          {onUpdate && <TouchableOpacity onPress={onUpdate}>
            <AntDesign name="edit" size={16} color={Colors.primaryColor} />
          </TouchableOpacity>}
          {onDelete && <TouchableOpacity onPress={onDelete}>
            <Ionicons
              name="trash-outline"
              size={17}
              color={Colors.accentOrange}
            />
          </TouchableOpacity>}
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        {props.attachments &&
          props.attachments.map((image, i) => (
            <TouchableOpacity
              onPress={onOpenSlider}
              key={i}
              style={styles.image}
            >
              <Image
                source={{ uri: image }}
                resizeMode="cover"
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
    flexShrink: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
});
