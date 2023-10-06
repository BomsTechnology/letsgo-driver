import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import IconButton from "@components/buttons/IconButton";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "@components/inputFields/CustomInput";
import CustomButton from "@components/buttons/CustomButton";
import { useForm } from "react-hook-form";
import { changeDriverPricing } from "@services/useDriver";
import { DriverPricing } from "@mytypes/TimeTableProps";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { showError, showSuccess } from "@functions/helperFunctions";

interface AddPricingModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  pricing: DriverPricing;
  setPricing: Function
}

const AddPricingModal = ({
  modalVisible,
  setModalVisible,
  pricing,
  setPricing
}: AddPricingModalProps) => {
  const driverState = useAppSelector((state: RootState) => state.driver);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    //formState: {errors},
  } = useForm();
  const pricePerHour = watch("pricePerHour");
  const pricePerDay = watch("pricePerDay");
  const pricePerKm = watch("pricePerKm");
  const closeIcon = (
    <Ionicons name="close" size={20} color={Colors.whiteTone1} />
  );

  const addOrUpdatePricing = async () => {
   await dispatch(
        changeDriverPricing({
            pricePerHour: pricePerHour,
            pricePerDay: pricePerDay,
            pricePerKilometer: pricePerKm,
            currency: 'XAF'
      })
    )
      .unwrap()
      .then((driver) => {
        setPricing(null)
        setModalVisible(false);
        showSuccess("Add Succes");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  useEffect(() => {
    if (pricing) {
      setValue("pricePerHour", pricing.pricePerHour?.toString());
      setValue("pricePerDay", pricing.pricePerDay?.toString());
      setValue("pricePerKm", pricing.pricePerKilometer?.toString());
    }else{
      setValue("pricePerHour", "");
      setValue("pricePerDay", "");
      setValue("pricePerKm", "");
    }
  }, [pricing]);

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
            onPress={() => {
              setModalVisible(false)
            }}
          />
        </View>
        <View style={styles.modalContainer}>
          <Text style={styles.description}>Prix au kilometre</Text>
          <CustomInput bgColor='#fff' keyboardType='numeric' control={control} name='pricePerKm' placeholder='' />

          <Text style={styles.description}>Prix par heure</Text>
          <CustomInput bgColor='#fff' keyboardType='numeric' control={control} name='pricePerHour' placeholder='' />

          <Text style={styles.description}>Prix par jour</Text>
          <CustomInput bgColor='#fff' keyboardType='numeric' control={control} name='pricePerDay' placeholder='' />

          <CustomButton
            bgColor={Colors.primaryColor}
            fgColor="#fff"
            isReady={true}
            onPress={handleSubmit(addOrUpdatePricing)}
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

export default AddPricingModal;

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
    backgroundColor: Colors.whiteTone1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: 'hidden',
    position: 'relative',
  },
  modalContainer_DARK: {
    backgroundColor: Colors.darkTone4,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: 'hidden',
    position: 'relative',
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
