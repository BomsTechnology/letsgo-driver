import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import Colors from "@constants/colors";
import { FAB } from "react-native-paper";
import SimpleHeader from "@components/SimpleHeader";
import SearchSyndicatModal from "@components/modal/SearchSyndicatModal";

const SyndicatScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const dispatch = useAppDispatch();
  const [showSearchSyndicat, setShowSearchSyndicat] = React.useState(true);
  return (
    <>
      <SearchSyndicatModal
        modalVisible={showSearchSyndicat}
        setModalVisible={setShowSearchSyndicat}
      />
      <SafeAreaView
        style={
          settingState.setting.isDarkMode
            ? styles.container_DARK
            : styles.container
        }
      >
        <SimpleHeader text="Syndicat" />
        <FAB
          icon="plus"
          color={Colors.secondaryColor}
          style={styles.fab}
          onPress={() => setShowSearchSyndicat(true)}
        />
      </SafeAreaView>
    </>
  );
};

export default SyndicatScreen;

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
    backgroundColor: Colors.whiteTone2,
    padding: 20,
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    padding: 20,
  },
});
