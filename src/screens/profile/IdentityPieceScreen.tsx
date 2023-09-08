import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { RootState, useAppSelector } from "@store/store";
import { FAB } from 'react-native-paper';
import IdentityCard, { IdentityCardProps } from '@components/cards/IdentityCard';
import ConfirmModal from '@components/modal/ConfirmModal';
import ImageSliderModal from '@components/modal/ImageSliderModal';
import AddIdentityModal from '@components/modal/AddIdentityModal';

const IdentityPieceScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [showAddIdentityModal, setShowAddIdentityModal] = React.useState(false);
  const aletrs: IdentityCardProps[] = [
    {
        id: '1',
        title: 'Marcelin Sigha',
        provider: 'Cameroon',
        attachements: [require("@assets/images/logo.png")],
    },
    {
        id: '2',
        provider: 'Cameroon',
        title: 'Letsgo',
        attachements: [require("@assets/images/logo.png"), require("@assets/images/logo.png"),require("@assets/images/logo.png"), require("@assets/images/logo.png")],
    },
    {
        id: '3',
        provider: 'Cameroon',
        title: 'New Transaction',
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
      <AddIdentityModal
        modalVisible={showAddIdentityModal}
        setModalVisible={setShowAddIdentityModal}
      />
    <SafeAreaView
      style={
        settingState.setting.isDarkMode
          ? styles.container_DARK
          : styles.container
      }
    >
      <SimpleHeader
        text="Identity P."
      />
      <FlatList
        data={aletrs}
        renderItem={({ item }: { item: IdentityCardProps }) => (
          <IdentityCard props={item} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id}
      />
      <FAB
        icon="plus"
        color={Colors.secondaryColor}
        style={styles.fab}
        onPress={() => setShowAddIdentityModal(true)}
      />
    </SafeAreaView>
    </>
  )
}

export default IdentityPieceScreen

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 9999,
    backgroundColor: Colors.primaryColor,
    color: Colors.onPrimaryColor
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