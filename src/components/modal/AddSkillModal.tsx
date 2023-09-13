import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import IconButton from "@components/buttons/IconButton";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "@components/inputFields/CustomInput";
import CustomButton from "@components/buttons/CustomButton";
import { useForm } from "react-hook-form";
import { addOrUpdateDriverSkill } from "@services/useDriver";
import { DriverSkill } from "@mytypes/TimeTableProps";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { showError, showSuccess } from "@functions/helperFunctions";

interface AddSkillModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  skill: DriverSkill;
  setSkill: Function
}

const AddSkillModal = ({
  modalVisible,
  setModalVisible,
  skill,
  setSkill
}: AddSkillModalProps) => {
  const [isEdit, setIsEdit] = React.useState(true);
  const driverState = useAppSelector((state: RootState) => state.driver);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    //formState: {errors},
  } = useForm();
  const name = watch("name");
  const description = watch("description");
  const closeIcon = (
    <Ionicons name="close" size={20} color={Colors.whiteTone1} />
  );

  const addOrUpdateSkill = async () => {
    await dispatch(
      addOrUpdateDriverSkill({
        name: name,
        desc: description,
      })
    )
      .unwrap()
      .then((driver) => {
        setSkill(undefined)
        setModalVisible(false);
        showSuccess("Add Succes");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  useEffect(() => {
    if (skill) {
      setValue("name", skill?.name);
      setValue("description", skill?.desc);
      setIsEdit(false);
    }else{
      setValue("name", "");
      setValue("description", "");
      setIsEdit(true);
    }
  }, [skill]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setSkill(null)
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.container]}>
        <View style={{ right: 10, position: "absolute", top: 30 }}>
          <IconButton
            bgColor={Colors.secondaryColor}
            icon={closeIcon}
            onPress={() => {
              setSkill(null)
              setModalVisible(false)
            }}
          />
        </View>
        <View style={styles.modalContainer}>
          <Text style={styles.description}>Skill Name</Text>
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
            editable={isEdit}
          />

          <Text style={styles.description}>Description</Text>
          <CustomInput
            placeholder=""
            name="description"
            control={control}
            secureTextEntry={false}
            fontSize={14}
            bgColor="#fff"
            multiline={true}
            rules={{
              required: "The description is required",
            }}
          />

          <CustomButton
            bgColor={Colors.primaryColor}
            fgColor="#fff"
            isReady={true}
            onPress={handleSubmit(addOrUpdateSkill)}
            text="Save"
            fontSize={14}
            marginVertical={20}
            loading={driverState.loading}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddSkillModal;

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
    backgroundColor: Colors.whiteTone1,
    borderRadius: 5,
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  modalContainer_DARK: {
    width: "90%",
    backgroundColor: Colors.darkTone4,
    borderRadius: 5,
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
