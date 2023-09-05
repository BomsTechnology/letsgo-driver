import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@constants/colors";
import SimpleHeader from "@components/SimpleHeader";
import { AppStackParamList } from "@navigators/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import { RootState, useAppSelector } from "@store/store";
import AlertDriver, { AlertDriverProps } from "@components/cards/AlertDriver";
import { FlatList } from "react-native-gesture-handler";

const HomeScreen = () => {
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
        text="Driver Home"
        LeftbuttonAction={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
        LeftbuttonIcon={menuIcon}
      />
      <View style={styles.blockItem}>
          <View style={styles.blockItemHeading}>
            <Text style={styles.blockItemTitle}>Current Task</Text>
          </View>
      </View>
      <View style={styles.blockItem}>
          <TouchableOpacity style={styles.blockItemHeading}>
            <Text style={styles.blockItemTitle}>Alerts</Text>
            <View style={styles.blockItemBuble}>
              <Text style={styles.blockItemBubleText}>08</Text>
            </View>
          </TouchableOpacity>

          <View style={{ height: 20 }}></View>
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
  );
};

export default HomeScreen;

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
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.grayTone3,
    marginTop: 10,
    marginBottom: 30
  },
  blockItemHeading: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: Colors.whiteTone1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  blockItemTitle: {
    fontFamily: 'Poppins_700Bold',
    textTransform: 'uppercase',
    fontSize: 14
  },
  blockItemBuble: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockItemBubleText: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: Colors.onPrimaryColor
  }
});
