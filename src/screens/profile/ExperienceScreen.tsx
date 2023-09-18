import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import ExperienceCard from "@components/cards/ExperienceCard";
import { FAB } from "react-native-paper";
import ConfirmModal from "@components/modal/ConfirmModal";
import ImageSliderModal from "@components/modal/ImageSliderModal";
import AddExperienceModal from "@components/modal/AddExperienceModal";
import { DriverExperience } from "@mytypes/TimeTableProps";
import { showError, showSuccess } from "@functions/helperFunctions";
import { removeDriverExperience } from "@services/useDriver";

const ExperienceScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const driverState = useAppSelector((state: RootState) => state.driver);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [showAddExperienceModal, setShowAddExperienceModal] =
    React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const [selectedExperience, setSelectedExperience] =
    React.useState<DriverExperience | null>(null);

  const openModalDelete = (xp: DriverExperience) => {
    setSelectedExperience(xp);
    setShowConfirmModal(true);
  };

  const openModalUpdate = (xp: DriverExperience) => {
    setSelectedExperience(xp);
    setShowAddExperienceModal(true);
  };

  const openModalSlider = (xp: DriverExperience) => {
    setSelectedExperience(xp);
    setShowImageModal(true);
  };

  const deleteExperience = async () => {
    await dispatch(removeDriverExperience(selectedExperience!.label))
      .unwrap()
      .then((data) => {
        setShowConfirmModal(false);
        setSelectedExperience(null);
        showSuccess("Remove Succes");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  return (
    <>
      <ConfirmModal
        modalVisible={showConfirmModal}
        setModalVisible={setShowConfirmModal}
        cancelBtnAction={() => setShowConfirmModal(false)}
        confirmBtnAction={deleteExperience}
        title={`Delete Experience`}
        message={"Are you sure you want to Delete Experience?"}
        btnColor={Colors.accentOrange}
        cancelBtnLabel="No, Keep it"
        confirmBtnLabel={`Delete`}
      />
      <ImageSliderModal
        modalVisible={showImageModal}
        setModalVisible={setShowImageModal}
        images={selectedExperience?.attachments!}
      />
      <AddExperienceModal
        modalVisible={showAddExperienceModal}
        setModalVisible={setShowAddExperienceModal}
        experience={selectedExperience!}
        setExperience={setSelectedExperience}
      />
      <SafeAreaView
        style={
          settingState.setting.isDarkMode
            ? styles.container_DARK
            : styles.container
        }
      >
        <SimpleHeader text="Experience" />
        <FlatList
          data={driverState.driver?.experiences}
          renderItem={({ item }: { item: DriverExperience }) => (
            <ExperienceCard
              props={item}
              onDelete={() => openModalDelete(item)}
              onUpdate={() => openModalUpdate(item)}
              onOpenSlider={() => openModalSlider(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item, i) => i.toString()}
        />
        <FAB
          icon="plus"
          color={Colors.secondaryColor}
          style={styles.fab}
          onPress={() => setShowAddExperienceModal(true)}
        />
      </SafeAreaView>
    </>
  );
};

export default ExperienceScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 9999,
    backgroundColor: Colors.primaryColor,
    color: Colors.onPrimaryColor,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    padding: 20,
  },
});
