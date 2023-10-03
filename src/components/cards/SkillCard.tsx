import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { DriverSkill } from "@mytypes/TimeTableProps";

const SkillCard = ({
  props,
  onDelete,
  onUpdate,
}: {
  props: DriverSkill;
  onDelete: (event: GestureResponderEvent) => void;
  onUpdate: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={onUpdate} style={{ flex: 1 }}>
        <View  style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <SimpleLineIcons
            name="puzzle"
            size={15}
            color={Colors.primaryColor}
          />
          <Text style={[styles.name]}>{props.name}</Text>
        </View>
        <Text style={[styles.text]}>{props.desc}</Text>
      </TouchableOpacity>
      <View style={{ gap: 5 }}>
        <TouchableOpacity onPress={onUpdate}>
          <AntDesign name="edit" size={16} color={Colors.primaryColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons
            name="trash-outline"
            size={17}
            color={Colors.accentOrange}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SkillCard;

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
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
  },
  name: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
});
