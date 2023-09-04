import {
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Modal } from "react-native";
import Colors from "@constants/colors";
import { Image } from "react-native";
import { RootState, useAppSelector } from "@store/store";

interface ConfirmModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  confirmBtnAction: () => void;
  cancelBtnAction: () => void;
  cancelBtnLabel: string;
  confirmBtnLabel: string;
  title: string;
  message: string;
  btnColor: string;
  image?: ImageSourcePropType;
}

const ConfirmModal = ({
  modalVisible,
  setModalVisible,
  confirmBtnAction,
  cancelBtnAction,
  cancelBtnLabel,
  confirmBtnLabel,
  title,
  message,
  image,
  btnColor,
}: ConfirmModalProps) => {
    const settingState = useAppSelector((state: RootState) => state.setting);
  const img = image ? image : require("@assets/images/Error.png");

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.container]}>
        <View style={settingState.setting.isDarkMode ? styles.modalContainer_DARK : styles.modalContainer}>
          <Text style={settingState.setting.isDarkMode ? styles.title_DARK : styles.title}>{title}</Text>
          <Image source={img} resizeMode="contain" style={styles.image} />
          <Text style={settingState.setting.isDarkMode ? styles.message_DARK : styles.message}>{message}</Text>
          <View style={styles.containerBtn}>
            <Pressable
              onPress={cancelBtnAction}
              style={[
                styles.actionBtn,
                {
                  backgroundColor: 'transparent',
                  borderColor: btnColor,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.actionBtnText,
                  {
                    color: btnColor,
                  },
                ]}
              >
                {cancelBtnLabel}
              </Text>
            </Pressable>
            <Pressable
              onPress={confirmBtnAction}
              style={[
                styles.actionBtn,
                {
                  borderColor: btnColor,
                  backgroundColor: btnColor,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.actionBtnText,
                  {
                    color: Colors.onPrimaryColor,
                  },
                ]}
              >
                {confirmBtnLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    height: 50,
    width: 100,
    marginVertical: 5,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: Colors.onWhiteTone,
    textAlign: "center",
  },
  message: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: Colors.onWhiteTone,
    textAlign: "center",
    marginTop: 5
  },
  title_DARK: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: Colors.onPrimaryColor,
    textAlign: "center",
  },
  message_DARK: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: Colors.onPrimaryColor,
    textAlign: "center",
    marginTop: 5
  },
  modalContainer: {
    width: "80%",
    backgroundColor: Colors.whiteTone1,
    borderRadius: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer_DARK: {
    width: "80%",
    backgroundColor: Colors.darkTone4,
    borderRadius: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  actionBtnText: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    textAlign: "center",
    width: "100%",
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 20,
    marginTop: 10,
  },
});
