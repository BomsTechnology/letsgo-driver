import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "@components/buttons/IconButton";
import ItemSearchSyndicat from "@components/cards/ItemSearchSyndicat";
import { Syndicat } from "@mytypes/SyndicatProps";
import { searchSyndicates } from "@services/useSyndicat";
import { showError } from "@functions/helperFunctions";

export interface SearchSyndicatModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
}

const SearchSyndicatModal = ({
  modalVisible,
  setModalVisible,
}: SearchSyndicatModalProps) => {
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState<Syndicat[]>([]);
  const [page, setPage] = React.useState(1);
  const [isSearch, setIsSearch] = React.useState(false);
  const [isFullSearch, setIsFullSearch] = React.useState(false);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeIcon = (
    <Ionicons name="close" size={20} color={Colors.whiteTone1} />
  );

  const onChangeText = async (value: string) => {
    setPage(1);
    setIsFullSearch(false);
    setIsSearch(true);
    setSearchValue(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      setResults([]);
      setLoading(true);
      console.log(page);
      await searchSyndicates({ query: value, page: page })
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((error) => {
          showError(error.message);
          setLoading(false);
        });
    }, 1000);
  };

  const searchMores = async () => {
    if (!isFullSearch) {
      setLoading(true);
      console.log(page);
      await searchSyndicates({ query: searchValue, page: page + 1 })
        .then((data) => {
          setPage(page + 1);
          if (data.length > 0) {
            setResults([...results, ...data]);
          } else {
            setIsFullSearch(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          showError(error.message);
          setLoading(false);
        });
    }
  };

  const sendRequest = async (item: Syndicat) => {
    setIsSearch(false);
    setResults([]);
    setSearchValue("");
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setIsSearch(false);
        setResults([]);
        setSearchValue("");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.container]}>
        <View style={{ right: 10, position: "absolute", top: 30 }}>
          <IconButton
            bgColor={Colors.secondaryColor}
            icon={closeIcon}
            onPress={() => {
              setIsSearch(false);
              setModalVisible(false);
              setResults([]);
              setSearchValue("");
            }}
          />
        </View>
        <View style={styles.modalContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={searchValue}
              onChangeText={onChangeText}
              style={styles.input}
              placeholder="Search"
            />
          </View>
          {results.length > 0 && <View style={{ height: 20 }}></View>}
          {results.length > 0 && (
            <View style={{ width: "100%", height: "auto" }}>
              <FlatList
                data={results}
                renderItem={({ item }: { item: Syndicat }) => (
                  <ItemSearchSyndicat
                    props={item}
                    onPress={() => sendRequest(item)}
                  />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(item, i) => i.toString()}
                onEndReached={searchMores}
              />
            </View>
          )}
          {results.length == 0 && loading == true && (
            <View style={{ height: 10 }}></View>
          )}
          {loading == true && (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: Colors.whiteTone1,
              }}
            >
              <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
          )}
          {isSearch && results.length == 0 && loading == false && (
            <View
              style={{
                width: "100%",
                paddingVertical: 10,
                marginVertical: 10,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontFamily: "Poppins_300Light" }}>No Result</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SearchSyndicatModal;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    width: "100%",
    flex: 1,
    height: "100%",
    color: Colors.grayTone1,
    fontFamily: "Poppins_300Light",
    fontSize: 14,
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalContainer: {
    maxHeight: "90%",
    maxWidth: "90%",
    width: "100%",
    backgroundColor: Colors.whiteTone1,
    borderRadius: 5,
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  modalContainer_DARK: {
    maxWidth: "90%",
    width: "100%",
    backgroundColor: Colors.darkTone4,
    borderRadius: 5,
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  description: {
    fontFamily: "Poppins_300Light",
    textAlign: "left",
    color: Colors.grayTone1,
    fontSize: 14,
    marginHorizontal: 5,
    marginTop: 15,
  },
});
