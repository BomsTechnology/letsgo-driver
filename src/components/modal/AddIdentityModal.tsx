import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import IconButton from "@components/buttons/IconButton";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "@components/inputFields/CustomInput";
import CustomButton from "@components/buttons/CustomButton";
import { useForm } from "react-hook-form";
import DatePicker from "@components/inputFields/DatePicker";
import ImagePicker from "@components/inputFields/ImagePicker";

interface AddIdentityModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
}

const AddIdentityModal = ({
    modalVisible,
    setModalVisible,
  }: AddIdentityModalProps) => {
    const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const {
    control,
    handleSubmit,
    watch,
    //formState: {errors},
  } = useForm();
  const closeIcon = (
    <Ionicons name="close" size={20} color={Colors.whiteTone1} />
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.container]}>
        <View style={{ right: 10, position: "absolute", top: 30 }}>
          <IconButton
            bgColor={Colors.secondaryColor}
            icon={closeIcon}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.description}>Name</Text>
          <CustomInput
            placeholder=""
            name="name"
            control={control}
            secureTextEntry={false}
            fontSize={14}
            bgColor="#fff"
            rules={{
              required: "The name is required",
            }}
          />

            <Text style={styles.description}>ID</Text>
          <CustomInput
            placeholder=""
            name="id"
            control={control}
            secureTextEntry={false}
            fontSize={14}
            bgColor="#fff"
            rules={{
              required: "The ID is required",
            }}
          />

          <Text style={styles.description}> Start Date</Text>
          <DatePicker
            date={startDate}
            setDate={setStartDate}
            bgColor={Colors.whiteTone2}
          />

          <Text style={styles.description}>End Date</Text>
          <DatePicker
            date={endDate}
            setDate={setEndDate}
            bgColor={Colors.whiteTone2}
          />

          <Text style={styles.description}>Provider</Text>
          <CustomInput
            placeholder=""
            name="provider"
            control={control}
            secureTextEntry={false}
            fontSize={14}
            bgColor="#fff"
            rules={{
              required: "The provider is required",
            }}
          />
         

          <Text style={styles.description}>Attachements</Text>
          <ImagePicker />

          <CustomButton
            bgColor={Colors.primaryColor}
            fgColor="#fff"
            isReady={true}
            onPress={handleSubmit(() => {})}
            text="Save"
            fontSize={14}
            marginVertical={20}
          />
        </ScrollView>
      </View>
    </Modal>
  )
}

export default AddIdentityModal

const styles = StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    modalContainer: {
      width: "90%",
      maxHeight: "75%",
      height: 'auto',
      backgroundColor: Colors.whiteTone1,
      borderRadius: 5,
      padding: 15,
    },
    modalContainer_DARK: {
      width: "90%",
      maxHeight: "80%",
      backgroundColor: Colors.darkTone4,
      borderRadius: 5,
      padding: 15,
    },
    description: {
      fontFamily: "Poppins_300Light",
      textAlign: "left",
      color: Colors.grayTone1,
      fontSize: 14,
      marginHorizontal: 5,
      marginTop: 15,
    },
  });