import { StyleSheet, Text, View, Image, FlatList, ScrollView } from "react-native";
import React from "react";
import SimpleHeader from "@components/SimpleHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@constants/colors";
import UserRating from "@components/UserRating";
import { Divider } from "@constants/ComponentStyled";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import { DriverSkill } from "@mytypes/TimeTableProps";
import ExperienceCard from "@components/cards/ExperienceCard";
import ImageSliderModal from "@components/modal/ImageSliderModal";
import { RootState, useAppSelector } from "@store/store";
import SkillCard from "@components/cards/SkillCard";


const PreviewDriverDetailScreen = () => {
  const driverState = useAppSelector((state: RootState) => state.driver);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);
  const openModalSlider = (images: string[]) => {
    setImages(images);
    setShowImageModal(true);
  };
  return (
    <>
      <ImageSliderModal
        modalVisible={showImageModal}
        setModalVisible={setShowImageModal}
        images={images}
      /> 
      <SafeAreaView style={styles.container}>
        <View style={{ paddingHorizontal: 20 }}>
          <SimpleHeader text={"Preview Details"} />
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            {driverState.driver!.picture ? (
              <Image
                resizeMode="contain"
                style={[styles.image]}
                source={{ uri: driverState.driver!.picture }}
              />
            ) : (
              <Ionicons
                name="person-circle"
                size={120}
                color={Colors.primaryColor}
              />
            )}
            <UserRating
              rate={driverState.driver!.score?.starCount!}
            />
          </View>
        </View>
         <ScrollView
          style={[styles.contentScroll]}
          showsVerticalScrollIndicator={false}
        >
          { (driverState.driver!.firstName || driverState.driver!.lastName) && (
            <>
              <Text style={styles.lightText}>Name and Surname</Text>
              <Text style={styles.semiBoldText}>
                {driverState.driver!.firstName} {driverState.driver!.lastName}
              </Text>
            </>
          )}
          {driverState.driver!.businessName && (
            <>
              <Text style={styles.lightText}>Gender</Text>
              <Text style={styles.semiBoldText}>
                {driverState.driver!.businessName}
              </Text>
            </>
          )}
          {driverState.driver!.about && (
            <>
              <Text style={styles.lightText}>About</Text>
              <Text style={styles.semiBoldText}>
                {driverState.driver!.about}
              </Text>
            </>
          )}
          {driverState.driver!.gender && (
            <>
              <Text style={styles.lightText}>Gender</Text>
              <Text style={styles.semiBoldText}>
                {driverState.driver!.gender}
              </Text>
            </>
          )}
          {driverState.driver!.cvLink && (
            <>
              <Text style={styles.lightText}>Cv Link</Text>
              <Text style={styles.semiBoldText}>
                {driverState.driver!.cvLink}
              </Text>
            </>
          )}
          {driverState.driver!.yearsOfExperience != undefined && (
            <>
              <Text style={styles.lightText}>Years Of Experience</Text>
              <Text style={styles.semiBoldText}>
                {driverState.driver!.yearsOfExperience}
              </Text>
            </>
          )}

          {driverState.driver!.skills && (
            <>
              <Text style={styles.lightText}>Skills</Text>
              <View style={{ paddingHorizontal: 15, marginTop: 5, gap: 5 }}>
                {driverState.driver!.skills.map((skill, i) => (
                  <SkillCard key={i} props={skill} />
                ))}
              </View>
            </>
          )}

          {driverState.driver!.experiences && (
            <>
              <Text style={styles.lightText}>Experience</Text>
              <View style={{ paddingHorizontal: 15, marginTop: 5, gap: 5 }}>
                {driverState.driver!.experiences.map((exp, i) => (
                  <ExperienceCard
                    onOpenSlider={() => openModalSlider(exp.attachments!)}
                    key={i}
                    props={exp}
                  />
                ))}
              </View>
            </>
                )}
          {driverState.driver!.driverPricing && (
            <>
              <Text style={styles.lightText}>Pricing</Text>
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 5,
                  backgroundColor: Colors.whiteTone2,
                  padding: 5,
                  borderRadius: 5,
                  borderWidth: 0.5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={[styles.lightText, { margin: 0, fontSize: 14 }]}>
                    Per Kilometer : 
                  </Text>
                  <Text
                    style={[styles.semiBoldText, { margin: 0, fontSize: 14 }]}
                  >
                    {driverState.driver!.driverPricing.pricePerKilometer}
                    {driverState.driver!.driverPricing.currency}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={[styles.lightText, { margin: 0, fontSize: 14 }]}>
                    Per Hour :
                  </Text>
                  <Text
                    style={[styles.semiBoldText, { margin: 0, fontSize: 14 }]}
                  >
                    {driverState.driver!.driverPricing.pricePerHour}
                    {driverState.driver!.driverPricing.currency}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={[styles.lightText, { margin: 0, fontSize: 14 }]}>
                    Per Day :
                  </Text>
                  <Text
                    style={[styles.semiBoldText, { margin: 0, fontSize: 14 }]}
                  >
                    {driverState.driver!.driverPricing.pricePerDay}
                    {driverState.driver!.driverPricing.currency}
                  </Text>
                </View>
              </View>
            </>
          )}
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </SafeAreaView>
                
    </>
  );
};

export default PreviewDriverDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    paddingTop: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 0.5,
    borderColor: Colors.grayTone4,
    backgroundColor: Colors.whiteTone1,
  },
  contentScroll: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 1,
    backgroundColor: Colors.whiteTone3,
    paddingHorizontal: 30,
    paddingTop: 10,
    position: "relative",
    marginTop: 10,
  },
  semiBoldText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.grayTone1,
  },
  lightText: {
    fontSize: 12,
    fontFamily: "Poppins_300Light",
    color: Colors.grayTone2,
    marginVertical: 5,
  },
});
