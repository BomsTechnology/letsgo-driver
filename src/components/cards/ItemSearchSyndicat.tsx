import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Syndicat } from "@mytypes/SyndicatProps";

const ItemSearchSyndicat = ({
  props,
  onPress,
}: {
  props: Syndicat;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderBottomWidth: 1,
        width: "100%",
        paddingVertical: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
        }}
      >
        {props.shortName}
      </Text>
      <Text
        style={{
          fontFamily: "Poppins_300Light",
        }}
      >
        {props.syndicatName || props.groupName}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemSearchSyndicat;

const styles = StyleSheet.create({});
