import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootState, useAppSelector } from '@store/store';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@constants/colors';
import { AppStackParamList } from '@navigators/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import AlertDriver, { AlertDriverProps } from '@components/cards/AlertDriver';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleHeader from '@components/SimpleHeader';

const AlertScreen = () => {
    const settingState = useAppSelector((state: RootState) => state.setting);
  const menuIcon = (
    <Ionicons name="menu" size={25} color={Colors.primaryColor} />
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    const aletrs: AlertDriverProps[] = [
        {
            id: '1',
            title: 'Marcelin Sigha',
            description: 'Make the experience of making around the city easier, faster and alfordable',
            image: require("@assets/images/avatars/Avatar5.png"),
            type: "INFO",
        },
        {
            id: '2',
            title: 'Letsgo',
            description: 'Take the control over your trips costs and access whenever you need to your data',
            type: "WARNING",
            image: require("@assets/images/logo.png"),
        },
        {
            id: '3',
            title: 'New Transaction',
            description: 'Share your trips with people doing same road and get exclusive discounts(even free trips)',
            type: "GOOD",
        },
      ];
  return (
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
    <SimpleHeader
      text="Driver Alerts"
      LeftbuttonAction={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
      LeftbuttonIcon={menuIcon}
    />
    <View style={styles.blockItem}>
        <FlatList
        data={aletrs}
        renderItem={({ item }: { item: AlertDriverProps }) => (
          <AlertDriver props={item} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  </SafeAreaView>
  )
}

export default AlertScreen

const styles = StyleSheet.create({
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
    blockItem: { 
      position: 'relative', 
      width: '100%', 
      marginTop: 10,
      borderRadius: 10,
    },
  });
  