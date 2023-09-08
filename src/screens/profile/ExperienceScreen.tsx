import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { RootState, useAppSelector } from "@store/store";
import ExperienceCard, {
  ExperienceCardProps,
} from "@components/cards/ExperienceCard";
import { FAB } from "react-native-paper";
import ConfirmModal from "@components/modal/ConfirmModal";
import ImageSliderModal from "@components/modal/ImageSliderModal";
import AddExperienceModal from "@components/modal/AddExperienceModal";

const ExperienceScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [showAddExperienceModal, setShowAddExperienceModal] =
    React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const aletrs: ExperienceCardProps[] = [
    {
      id: "1",
      start_date: "02/02/2022",
      end_date: "02/02/2023",
      title: "Marcelin Sigha",
      description:
        "Make the experience of making around the city easier, faster and alfordable",
    },
    {
      id: "2",
      start_date: "02/02/2022",
      end_date: "02/02/2023",
      title: "Letsgo",
      description:
        "Take the control over your trips costs and access whenever you need to your data",
      attachements: [
        require("@assets/images/logo.png"),
        require("@assets/images/logo.png"),
        require("@assets/images/logo.png"),
        require("@assets/images/logo.png"),
      ],
    },
    {
      id: "3",
      start_date: "02/02/2022",
      end_date: "02/02/2023",
      title: "New Transaction",
      description:
        "Share your trips with people doing same road and get exclusive discounts(even free trips)",
      attachements: [require("@assets/images/logo.png")],
    },
  ];
  return (
    <>
      <ConfirmModal
        modalVisible={showConfirmModal}
        setModalVisible={setShowConfirmModal}
        cancelBtnAction={() => setShowConfirmModal(false)}
        confirmBtnAction={() => null}
        title={`Delete Skill`}
        message={"Are you sure you want to Delete Skill?"}
        btnColor={Colors.accentOrange}
        cancelBtnLabel="No, Keep it"
        confirmBtnLabel={`Delete`}
      />
      <ImageSliderModal
        modalVisible={showImageModal}
        setModalVisible={setShowImageModal}
      />
      <AddExperienceModal
        modalVisible={showAddExperienceModal}
        setModalVisible={setShowAddExperienceModal}
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
          data={aletrs}
          renderItem={({ item }: { item: ExperienceCardProps }) => (
            <ExperienceCard props={item} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item.id}
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
