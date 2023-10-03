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
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { addOrUpdateDriverLicence } from "@services/useDriver";
import { HumanIdentity } from "@mytypes/TimeTableProps";
import { showError, showSuccess } from "@functions/helperFunctions";
import CustomDropdownInput, { DropDataProps } from "@components/inputFields/CustomDropdownInput";

interface AddIdentityModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  humanIdentity: HumanIdentity;
  setHumanIdentity: Function;
}

const AddIdentityModal = ({
    modalVisible,
    setModalVisible,
    humanIdentity,
    setHumanIdentity
  }: AddIdentityModalProps) => {
    const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = React.useState(true);
  const [selectedType, setSelectedType] = React.useState("");
  const driverState = useAppSelector((state: RootState) => state.driver);
    const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [files, setFiles] = React.useState<{ name: string; file: Blob }[]>([]);
  const [oldFiles, setOldFiles] = React.useState<string[]>([]);
  const [defaultType, setDefaultType] = React.useState<DropDataProps>(
    { key: "1", value: "CNI" }
  );
  const genderData: DropDataProps[] = [
    { key: "1", value: "CNI" },
    { key: "4", value: "PERMIT" },
  ]
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

  const uuid = watch("uuid");
  const provider = watch("provider");
  const saveHumanIdentity = async () => {
    await dispatch(
      addOrUpdateDriverLicence({
        humanIdentity: {
          identityUId: uuid,
          formattedIdentityProvider: provider,
          issueAt: startDate.toISOString().split("T")[0],
          expireAt: endDate.toISOString().split("T")[0],
          type: selectedType as "VISA" | "CNI" | "PERMIT" | "PASSPORT" | "SCHOOL_IDENTITY",
        },
        files: files,
        oldFiles: oldFiles,
      })
    )
      .unwrap()
      .then((data) => {
        setHumanIdentity(null);
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
    if (humanIdentity) {
      setValue("uuid", humanIdentity?.identityUId);
      setValue("provider", humanIdentity?.formattedIdentityProvider);
      if (humanIdentity?.issueAt) setStartDate(new Date(humanIdentity?.issueAt));
      if (humanIdentity?.expireAt) setEndDate(new Date(humanIdentity?.expireAt));
      setOldFiles(humanIdentity?.docs ? humanIdentity?.docs : []);
      setIsEdit(false);
    } else {
      setValue("uuid", "");
      setValue("provider", "");
      setIsEdit(true);
      setOldFiles([]);
    }
  }, [humanIdentity]);

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
          <CustomDropdownInput
          placeholder="Select a type"
          data={genderData}
          setSelected={setSelectedType}
          search={false}
          defaultOption={defaultType}
        />

            <Text style={styles.description}>ID</Text>
          <CustomInput
            placeholder=""
            name="uuid"
            editable={isEdit}
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
            placeholder="Cameroon"
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
          <ImagePicker setFiles={setFiles} 
            files={files}
            oldFiles={oldFiles}
            setOldFiles={setOldFiles} />

          <CustomButton
            bgColor={Colors.primaryColor}
            fgColor="#fff"
            isReady={uuid && provider}
            onPress={handleSubmit(saveHumanIdentity)}
            loading={driverState!.loading}
            text="Save"
            fontSize={14}
            marginVertical={20}
          />
          <View style={{ height:30 }}></View>
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
      width: "100%",
    maxHeight: "75%",
    height: "auto",
    overflow: 'hidden',
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 20,
      backgroundColor: Colors.darkTone4,
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