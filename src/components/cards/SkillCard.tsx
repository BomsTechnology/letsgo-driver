import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";

export interface SkillCardProps {
  title: string;
  id: string;
  description: string;
}

const SkillCard = ({ props }: { props: SkillCardProps }) => {
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <SimpleLineIcons
            name="puzzle"
            size={15}
            color={Colors.primaryColor}
          />
          <Text style={[styles.name]}>{props.title}</Text>
        </View>
        <Text style={[styles.text]}>{props.description}</Text>
      </View>
      <View style={{ gap:5 }}>
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
