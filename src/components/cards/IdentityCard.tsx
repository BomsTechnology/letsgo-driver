import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { HumanIdentity } from "@mytypes/TimeTableProps";

export interface IdentityCardProps {
  title: string;
  id: string;
  provider: string;
  attachements?: ImageSourcePropType[];
}

const IdentityCard = ({
  props,
  onDelete,
  onUpdate,
  onOpenSlider,
}: {
  props: HumanIdentity;
  onDelete: (event: GestureResponderEvent) => void;
  onUpdate: (event: GestureResponderEvent) => void;
  onOpenSlider: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "stretch" }}>
        <TouchableOpacity onPress={onUpdate} style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={[styles.text]}>{props.type}</Text>
            {props.isVerified && props.verifiedAt && (
              <Text style={[styles.text, { color: Colors.accentGreen }]}>
                {" "}
                - Verified
              </Text>
            )}
          </View>

          <Text style={[styles.name]}>{props.identityUId}</Text>
          <Text style={[styles.text]}>
            {`De ${props.issueAt} à ${props.expireAt}`}
          </Text>
          <Text style={[styles.text]}>{props.formattedIdentityProvider}</Text>
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
      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        {props.docs &&
          props.docs.map((image, i) => (
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

export default IdentityCard;

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
    backgroundColor: Colors.whiteTone1,
    marginTop: 10,
    width: "30%",
    flexShrink: 0,
    borderRadius: 10,
    height: 100,
    overflow: "hidden",
  },
});
