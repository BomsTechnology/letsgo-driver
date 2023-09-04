import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef } from "react";
import Colors from "@constants/colors";
import { TextInput, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Divider } from "@constants/ComponentStyled";
import { useForm, FieldValues } from "react-hook-form";
import {
  searchPlace,
  setDeparture,
  setDestination,
} from "@services/useSearchPlace";
const { width, height } = Dimensions.get("window");
import { showError } from "@functions/helperFunctions";
import { ActivityIndicator } from "react-native";
import { PlaceProps } from "../../types/PlaceProps";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import SearchPlaceItem from "@components/SearchPlaceItem";
import DatePicker from "@components/inputFields/DatePicker";
import CustomInput from "@components/inputFields/CustomInput";
import CustomButton from "@components/buttons/CustomButton";
import { makeRouting } from "@services/useLocalization";

interface SearchModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
}

const SearchModal = ({ modalVisible, setModalVisible }: SearchModalProps) => {
  const {
    control,
    handleSubmit,
    watch,
    //formState: {errors},
  } = useForm();
  const moneyIcon = (
    <FontAwesome5 name="search-dollar" size={16} color={Colors.primaryColor} />
  );
  const dispatch = useAppDispatch();
  const localisationState = useAppSelector(
    (state: RootState) => state.localization
  );
  const [departureDate, setDepartureDate] = React.useState(new Date());
  const [departureValue, setDepartureValue] = React.useState("");
  const [destinationValue, setDestanationValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<PlaceProps[]>([]);
  const [currentSearch, setCurrentSearch] = React.useState("departure");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onChangeText = async (value: string, type: string) => {
   /* if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }*/
    switch (type) {
      case "departure":
        setDepartureValue(value);
        setCurrentSearch(type);
        break;
      case "destination":
        setDestanationValue(value);
        setCurrentSearch(type);
        break;
    }
    /*typingTimeoutRef.current = setTimeout(async () => {*/
      await search();
    /*}, 1000);*/
  };

  const search = async () => {
    setIsLoading(true);
    switch (currentSearch) {
      case "departure":
        await searchPlace(departureValue)
          .then((data) => {
            setResults(data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            showError(JSON.stringify(error));
          });
        break;
      case "destination":
        await searchPlace(destinationValue)
          .then((data) => {
            setResults(data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            showError(JSON.stringify(error));
          });
        break;
    }
  };

  const handleBlur = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      //setResults([]);
    }
  };

  const clearSearch = async (type: string) => {
    setIsLoading(false);
    setResults([]);
    switch (type) {
      case "departure":
        setDepartureValue("");
        dispatch(setDeparture(null));
        break;
      case "destination":
        setDestanationValue("");
        dispatch(setDestination(null));
        break;
    }
  };

  const selectPlace = async (item: PlaceProps): Promise<void> => {
    switch (currentSearch) {
      case "departure":
        setDepartureValue(item.properties.name);
        await dispatch(setDeparture(item));
        break;
      case "destination":
        setDestanationValue(item.properties.name);
        await dispatch(setDestination(item));
    }
    setResults([]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.container]}>
        <Pressable
          onPress={() => {
            setModalVisible(false)
          }}
          style={{
            flex: 1,
            width: "100%",
          }}
        ></Pressable>
        <View style={[styles.innerContainer]}>
          <View style={[styles.searchBox]}>
            <View style={styles.inputContainer}>
              <Ionicons name="locate" size={25} color={Colors.primaryColor} />
              <View style={[styles.innerInputContainer]}>
                <Text style={[styles.minText]}>Departure</Text>
                <TextInput
                  placeholder="Type your Departure here..."
                  onChangeText={(text) => onChangeText(text, "departure")}
                  value={departureValue}
                  placeholderTextColor={Colors.grayTone2}
                  onBlur={handleBlur}
                  style={styles.input}
                />
              </View>
              {departureValue != "" && (
                <TouchableOpacity onPress={() => clearSearch("departure")}>
                  <Ionicons name="close" size={25} color={Colors.grayTone2} />
                </TouchableOpacity>
              )}
            </View>
            <Divider />
            <View style={styles.inputContainer}>
              <Ionicons
                name="location-outline"
                size={25}
                color={Colors.secondaryColor}
              />
              <View style={[styles.innerInputContainer]}>
                <Text style={[styles.minText]}>Destination</Text>
                <TextInput
                  placeholder="Type your Destination here..."
                  placeholderTextColor={Colors.grayTone2}
                  onChangeText={(text) => onChangeText(text, "destination")}
                  onBlur={handleBlur}
                  value={destinationValue}
                  style={styles.input}
                />
              </View>
              {destinationValue != "" && (
                <TouchableOpacity onPress={() => clearSearch("destination")}>
                  <Ionicons name="close" size={25} color={Colors.grayTone2} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              marginTop: 10,
              paddingHorizontal: 5,
            }}
          >
            <DatePicker
              date={departureDate}
              setDate={setDepartureDate}
              bgColor={Colors.whiteTone1}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  width: "48%",
                  marginRight: 5,
                }}
              >
                <CustomInput
                  placeholder="Number of Seat"
                  name="money"
                  control={control}
                  secureTextEntry={false}
                  prefixType="icon"
                  prefix={moneyIcon}
                  bgColor={Colors.whiteTone2}
                  keyboardType="numeric"
                  marginVertical={0}
                  fontSize={13}
                  rules={{
                    required: "The price is required",
                  }}
                />
              </View>
              <View
                style={{
                  width: "48%",
                }}
              >
                <CustomInput
                  placeholder="Your budget"
                  name="money"
                  control={control}
                  secureTextEntry={false}
                  sufixType="icon"
                  bgColor={Colors.whiteTone2}
                  keyboardType="numeric"
                  marginVertical={0}
                  fontSize={13}
                  sufix={moneyIcon}
                  rules={{
                    required: "The price is required",
                  }}
                />
              </View>
            </View>
          </View>

          {departureValue == "" && destinationValue == "" ? (
            <View style={[styles.centerContainer]}>
              <Ionicons
                name="happy-outline"
                size={50}
                color={Colors.primaryColor}
              />
              <Text style={[styles.textBold, { color: Colors.primaryColor }]}>
                Start Search
              </Text>
            </View>
          ) : isLoading ? (
            <View style={[styles.centerContainer]}>
              <ActivityIndicator size={"large"} color={Colors.primaryColor} />
            </View>
          ) : results.length > 0 ? (
            <FlatList
              data={results}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }: { item: PlaceProps }) => (
                <SearchPlaceItem
                  onPress={() => selectPlace(item)}
                  item={item}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              style={{ flex: 1, marginTop: 20, paddingHorizontal: 10, paddingBottom: 80 }}
            />
          ) : (!localisationState.destination ||
              !localisationState.departure) &&
            results.length === 0 ? (
            <View style={[styles.centerContainer]}>
              <FontAwesome5 name="sad-cry" size={50} color={Colors.grayTone2} />
              <Text style={[styles.textBold, { color: Colors.grayTone2 }]}>
                No Result
              </Text>
            </View>
          ) : localisationState.destination && localisationState.departure ? (
            <View style={[styles.centerContainer]}>
              <Ionicons
                name="happy-outline"
                size={50}
                color={Colors.accentGreen}
              />
              <Text style={[styles.textBold, { color: Colors.accentGreen }]}>
                Submit Search
              </Text>
            </View>
          ) : null}
          <View key="fixed" style={[styles.seatBox]}>

       <CustomButton
         bgColor={Colors.secondaryColor}
         radius={50}
         fgColor='#fff'
         isReady={true}
         onPress={()=>{}}
         text="Search"
       /> 
 </View>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "relative",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    height: "92%",
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.whiteTone2,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  searchBox: {
    width: "100%",
    shadowColor: "#171717",
    elevation: 4,
    backgroundColor: Colors.whiteTone2,
    borderRadius: 30,
    overflow: "hidden",
  },
  innerInputContainer: {
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
  input: {
    flex: 1,
    height: 45,
    color: Colors.grayTone1,
    fontFamily: "Poppins_300Light",
    fontSize: 14,
  },
  minText: {
    color: Colors.grayTone3,
    fontFamily: "Poppins_300Light",
    fontSize: 10,
    lineHeight: 12,
  },
  textBold: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    letterSpacing: 2,
    marginTop: 10,
    textTransform: "uppercase",
  },
  seatBox: {
    width: width,
    padding: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left:0,
    right: 0,
  }
});
