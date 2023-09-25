import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import Colors from "@constants/colors";
import { FAB } from "react-native-paper";
import SimpleHeader from "@components/SimpleHeader";
import SearchSyndicatModal from "@components/modal/SearchSyndicatModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MembershipRequest } from "@mytypes/SyndicatProps";
import { Ionicons } from '@expo/vector-icons';


const SyndicatScreen = () => {


  const settingState = useAppSelector((state: RootState) => state.setting);
  const dispatch = useAppDispatch();
  const [showSearchSyndicat, setShowSearchSyndicat] = React.useState(false);
  const [memberRequest, setMemberRequest] = useState<MembershipRequest>()


  useEffect(() => {

    getMemberRequest()

  }, [])


  const getMemberRequest = async () => {

    const request = await AsyncStorage.getItem("syndicat_request")

    if (request) {

      const mr = JSON.parse(request) as MembershipRequest
      setMemberRequest(mr);
    }

    return undefined;
  }





  return (
    <>
      <SearchSyndicatModal
        modalVisible={showSearchSyndicat}
        setModalVisible={setShowSearchSyndicat}
        refreshMemberRequest={getMemberRequest} />
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




        {memberRequest && <View>

          <View style={{
            borderWidth: 1,
            padding: 10,
            borderColor: Colors.primaryColor,
            borderRadius: 10
          }}>

            <Text
              style={{
                fontFamily: "Poppins_500Medium",
              }}
            >
              {memberRequest.syndicat!.shortName}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_300Light",
              }}
            >
              {memberRequest.syndicat!.syndicatName}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons style={{ marginRight: 5 }} name="location" size={20} />
              <Text>{`${memberRequest.syndicat!.offices![0].address!.country} - ${memberRequest.syndicat!.offices![0].address!.street}`}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons style={{ marginRight: 5 }} name="person" size={20} />
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                }}
              >
                {memberRequest.syndicat!.offices![0].managerName}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons style={{ marginRight: 5 }} name="call" size={20} />
              <Text>{`${memberRequest.syndicat!.offices![0].phones}`}</Text>
            </View>


            <Text>{`Envoyé le : ${memberRequest.emittedAt}`}</Text>
            <Text>{`Statut : ${memberRequest.status}`}</Text>

          </View>

        </View>}

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
