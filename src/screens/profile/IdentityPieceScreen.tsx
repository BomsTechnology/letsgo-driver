import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { FAB } from "react-native-paper";
import IdentityCard, {
  IdentityCardProps,
} from "@components/cards/IdentityCard";
import ConfirmModal from "@components/modal/ConfirmModal";
import ImageSliderModal from "@components/modal/ImageSliderModal";
import AddIdentityModal from "@components/modal/AddIdentityModal";
import { HumanIdentity } from "@mytypes/TimeTableProps";
import { showError, showSuccess } from "@functions/helperFunctions";
import { removeDriverLicence } from "@services/useDriver";

const IdentityPieceScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const driverState = useAppSelector((state: RootState) => state.driver);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [showAddIdentityModal, setShowAddIdentityModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const [selectedHumanIdentity, setSelectedHumanIdentity] =
    React.useState<HumanIdentity | null>(null);

  const openModalDelete = (xp: HumanIdentity) => {
    setSelectedHumanIdentity(xp);
    setShowConfirmModal(true);
  };

  const openModalUpdate = (xp: HumanIdentity) => {
    setSelectedHumanIdentity(xp);
    setShowAddIdentityModal(true);
  };

  const openModalSlider = (xp: HumanIdentity) => {
    setSelectedHumanIdentity(xp);
    setShowImageModal(true);
  };

  const deleteHumanIdentity = async () => {
    await dispatch(removeDriverLicence(selectedHumanIdentity!.identityUId!))
      .unwrap()
      .then((data) => {
        setShowConfirmModal(false);
        setSelectedHumanIdentity(null);
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
        confirmBtnAction={deleteHumanIdentity}
        title={`Delete Skill`}
        message={"Are you sure you want to Delete Skill?"}
        btnColor={Colors.accentOrange}
        cancelBtnLabel="No, Keep it"
        confirmBtnLabel={`Delete`}
      />
      <ImageSliderModal
        modalVisible={showImageModal}
        setModalVisible={setShowImageModal}
        images={selectedHumanIdentity?.docs!}
      />
      <AddIdentityModal
        modalVisible={showAddIdentityModal}
        setModalVisible={setShowAddIdentityModal}
        humanIdentity={selectedHumanIdentity!}
        setHumanIdentity={setSelectedHumanIdentity}
      />
      <SafeAreaView
        style={
          settingState.setting.isDarkMode
            ? styles.container_DARK
            : styles.container
        }
      >
        <SimpleHeader text="Identity P." />
        <FlatList
          data={driverState.driver?.driverLicences}
          renderItem={({ item }: { item: HumanIdentity }) => (
            <IdentityCard
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
          onPress={() => setShowAddIdentityModal(true)}
        />
      </SafeAreaView>
    </>
  );
};

export default IdentityPieceScreen;

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
