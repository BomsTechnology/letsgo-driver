import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import IconButton from "@components/buttons/IconButton";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "@components/inputFields/CustomInput";
import CustomButton from "@components/buttons/CustomButton";
import { useForm } from "react-hook-form";
import DatePicker from "@components/inputFields/DatePicker";
import ImagePicker from "@components/inputFields/ImagePicker";
import useFile from "@services/useFile";
import { DriverExperience } from "@mytypes/TimeTableProps";
import { addOrUpdateDriverExperience } from "@services/useDriver";
import { showError, showSuccess } from "@functions/helperFunctions";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";

interface AddExperienceModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  experience: DriverExperience;
  setExperience: Function;
}

const AddExperienceModal = ({
  modalVisible,
  setModalVisible,
  experience,
  setExperience,
}: AddExperienceModalProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = React.useState(true);
  const driverState = useAppSelector((state: RootState) => state.driver);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [files, setFiles] = React.useState<{ name: string; file: Blob }[]>([]);
  const [oldFiles, setOldFiles] = React.useState<string[]>([]);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    //formState: {errors},
  } = useForm();
  const closeIcon = (
    <Ionicons name="close" size={20} color={Colors.whiteTone1} />
  );
  const name = watch("name");
  const description = watch("description");
  const saveExperience = async () => {
    await dispatch(
      addOrUpdateDriverExperience({
        driverExperience: {
          label: name,
          desc: description,
          startAt: startDate.toISOString().split("T")[0],
          endAt: endDate.toISOString().split("T")[0],
        },
        files: files,
        oldFiles: oldFiles,
      })
    )
      .unwrap()
      .then((data) => {
        setExperience(null);
        setModalVisible(false);
        showSuccess("Add Succes");
        setFiles([]);
        setOldFiles([]);
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  useEffect(() => {
    if (experience) {
      setValue("name", experience?.label);
      setValue("description", experience?.desc);
      if (experience?.startAt) setStartDate(new Date(experience?.startAt));
      if (experience?.endAt) setEndDate(new Date(experience?.endAt));
      setOldFiles(experience?.attachments ? experience?.attachments : []);
      setIsEdit(false);
    } else {
      setValue("name", "");
      setValue("description", "");
      setIsEdit(true);
      setOldFiles([]);
    }
  }, [experience]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setExperience(null);
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.container]}>
        <View style={{ right: 10, position: "absolute", top: 30 }}>
          <IconButton
            bgColor={Colors.secondaryColor}
            icon={closeIcon}
            onPress={() => {
              setExperience(null);
              setModalVisible(false);
            }}
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
            editable={isEdit}
            rules={{
              required: "The name is required",
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
            }}
          />

          <Text style={styles.description}>Attachements</Text>
          <ImagePicker 
            setFiles={setFiles} 
            files={files}
            oldFiles={oldFiles}
            setOldFiles={setOldFiles} 
            />

          <CustomButton
            bgColor={Colors.primaryColor}
            fgColor="#fff"
            isReady={name}
            onPress={handleSubmit(saveExperience)}
            loading={driverState.loading}
            text="Save"
            fontSize={14}
            marginVertical={20}
          />
          <View style={{ height:30 }}></View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddExperienceModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
  modalContainer: {
    width: "100%",
    maxHeight: "75%",
    height: "auto",
    backgroundColor: Colors.whiteTone1,
    overflow: 'hidden',
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  modalContainer_DARK: {
    backgroundColor: Colors.darkTone4,
    width: "100%",
    maxHeight: "75%",
    height: "auto",
    overflow: 'hidden',
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 20,
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
