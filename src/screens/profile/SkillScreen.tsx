import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import { FAB } from "react-native-paper";
import SkillCard from "@components/cards/SkillCard";
import AddSkillModal from "@components/modal/AddSkillModal";
import ConfirmModal from "@components/modal/ConfirmModal";
import { DriverSkill } from "@mytypes/TimeTableProps";
import { removeDriverSkill } from "@services/useDriver";
import { showError, showSuccess } from "@functions/helperFunctions";

const SkillScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const driverState = useAppSelector((state: RootState) => state.driver);
  const [showAddSkillModal, setShowAddSkillModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const [selectedSkill, setSelectedSkill] = React.useState<DriverSkill | null>(
    null
  );

  const openModalDelete = (skill: DriverSkill) => {
    setSelectedSkill(skill);
    setShowConfirmModal(true);
  };

  const openModalUpdate = (skill: DriverSkill) => {
    setSelectedSkill(skill);
    setShowAddSkillModal(true);
  };

  const deleteSkill = async () => {
    await dispatch(removeDriverSkill(selectedSkill!.name))
      .unwrap()
      .then((driver) => {
        setShowConfirmModal(false);
        setSelectedSkill(null);
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
        confirmBtnAction={deleteSkill}
        title={`Delete Skill`}
        message={"Are you sure you want to Delete Skill?"}
        btnColor={Colors.accentOrange}
        cancelBtnLabel="No, Keep it"
        confirmBtnLabel={`Delete`}
      />
      <AddSkillModal
        modalVisible={showAddSkillModal}
        skill={selectedSkill!}
        setSkill={setSelectedSkill}
        setModalVisible={setShowAddSkillModal}
      />
      <SafeAreaView
        style={
          settingState.setting.isDarkMode
            ? styles.container_DARK
            : styles.container
        }
      >
        <SimpleHeader text="Skills" />
        <FlatList
          data={driverState.driver?.skills}
          renderItem={({ item }: { item: DriverSkill }) => (
            <SkillCard
              props={item}
              onDelete={() => openModalDelete(item)}
              onUpdate={() => openModalUpdate(item)}
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
          onPress={() => {
            setShowAddSkillModal(!showAddSkillModal);
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default SkillScreen;

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
