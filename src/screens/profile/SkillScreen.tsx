import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { RootState, useAppSelector } from "@store/store";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import { FAB } from 'react-native-paper';
import SkillCard, { SkillCardProps } from "@components/cards/SkillCard";
import AddSkillModal from "@components/modal/AddSkillModal";
import ConfirmModal from "@components/modal/ConfirmModal";

const SkillScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const [showAddSkillModal, setShowAddSkillModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const aletrs: SkillCardProps[] = [
    {
        id: '1',
        title: 'Marcelin Sigha',
        description: 'Make the experience of making around the city easier, faster and alfordable',
    },
    {
        id: '2',
        title: 'Letsgo',
        description: 'Take the control over your trips costs and access whenever you need to your data',
    },
    {
        id: '3',
        title: 'New Transaction',
        description: 'Share your trips with people doing same road and get exclusive discounts(even free trips)',
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
      cancelBtnLabel='No, Keep it'
      confirmBtnLabel={`Delete`}
    />
    <AddSkillModal modalVisible={showAddSkillModal} setModalVisible={setShowAddSkillModal} />
    <SafeAreaView
      style={
        settingState.setting.isDarkMode
          ? styles.container_DARK
          : styles.container
      }
    >
      <SimpleHeader
        text="Skills"
      />
      <FlatList
        data={aletrs}
        renderItem={({ item }: { item: SkillCardProps }) => (
          <SkillCard props={item} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id}
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
  )
}

export default SkillScreen

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