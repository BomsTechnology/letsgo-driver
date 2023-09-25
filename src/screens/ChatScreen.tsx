import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";

import Colors from "@constants/colors"; 
import SimpleHeader from "@components/SimpleHeader";
import { Ionicons } from "@expo/vector-icons"; 
import { RootState, useAppSelector } from "@store/store";
import { StatusBar } from "expo-status-bar";



interface messageProps {
  id: string;
  fromMe: boolean;
  message: string;
}



const ChatScreen: React.FC = () => {

  const settingState = useAppSelector((state: RootState) => state.setting);
  const messages: messageProps[] = [
    {
      id: "1",
      fromMe: true,
      message: "Hi, how are you?",
    },
    {
      id: "2",
      fromMe: false,
      message:
        "Hi, how are you? Hi, how are you? Hi, how are you?Hi, how are you? Hi, how are you?  Hi, how are you?",
    },
    {
      id: "3",
      fromMe: false,
      message: "Where a you going",
    },
    {
      id: "4",
      fromMe: true,
      message: "I going to school",
    },
    {
      id: "5",
      fromMe: false,
      message: "Ok Good!",
    },
    {
      id: "6",
      fromMe: true,
      message: "Thanks for your message",
    },
    {
      id: "7",
      fromMe: true,
      message: "Goodbye",
    },
    {
      id: "8",
      fromMe: true,
      message:
        "Hi, how are you? Hi, how are you? Hi, how are you?Hi, how are you? Hi, how are you?  Hi, how are you?",
    },
    {
      id: "9",
      fromMe: true,
      message: "Goodbye",
    },
    {
      id: "10",
      fromMe: true,
      message:
        "Hi, how are you? Hi, how are you? Hi, how are you?Hi, how are you? Hi, how are you?  Hi, how are you?",
    },
    {
      id: "11",
      fromMe: true,
      message: "Goodbye",
    },
    {
      id: "12",
      fromMe: true,
      message:
        "Hi, how are you? Hi, how are you? Hi, how are you?Hi, how are you? Hi, how are you?  Hi, how are you?",
    },
  ];

  const messageRender = ({ item }: { item: messageProps }) => {
    let index = messages.indexOf(item);
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: item.fromMe ? "flex-start" : "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: item.fromMe
              ? Colors.primaryColor
              : settingState.setting.isDarkMode
                ? Colors.grayTone1 : Colors.whiteTone2,
            elevation: 2,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            borderTopEndRadius: item.fromMe
              ? 10
              : index > 0 && !messages[index - 1].fromMe
                ? 10
                : 0,
            borderTopStartRadius: !item.fromMe
              ? 10
              : index > 0 && messages[index - 1].fromMe
                ? 10
                : 0,
            flexDirection: "row",
            justifyContent: "flex-start",
            maxWidth: "90%",
          }}
        >
          <Text
            style={{
              color: item.fromMe ? Colors.onPrimaryColor : settingState.setting.isDarkMode
                ? Colors.onPrimaryColor : Colors.onWhiteTone,
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              width: "auto",
            }}
          >
            {item.message}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={
        settingState.setting.isDarkMode
          ? styles.container_DARK
          : styles.container
      }
    >
      <StatusBar translucent={true} />
 

      <View style={{
					paddingHorizontal: 20,
					paddingTop: 20,
				}}
				>
					<SimpleHeader text="Mr Teubou" />

				</View>


      <FlatList
        data={messages}
        showsHorizontalScrollIndicator={false}
        renderItem={messageRender}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{
          paddingVertical: 5,
          alignItems: "flex-start",
          width: "100%",
          flexDirection: "column",
        }}
        
      />
      <View style={settingState.setting.isDarkMode
        ? styles.inputContainer_DARK : styles.inputContainer}>
        <TextInput
          placeholder="Type your message here..."
          onFocus={(event) => console.log(event)}
          placeholderTextColor={Colors.grayTone3}
          style={settingState.setting.isDarkMode
            ? styles.input_DARK : styles.input}
        />
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Ionicons name="send" style={{marginRight: 7.5}} size={25} color={Colors.primaryColor} />
          <Ionicons name="mic" size={25} color={Colors.primaryColor} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    padding: 20,
    width: "100%",
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    padding: 20,
    width: "100%",
  },
  inputContainer: {
    elevation: 1,
    width: "100%",
    height: 50,
    backgroundColor: Colors.whiteTone1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  inputContainer_DARK: {
    elevation: 1,
    width: "100%",
    height: 50,
    backgroundColor: Colors.darkTone4,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: Colors.grayTone1,
    fontFamily: "Poppins_300Light",
    fontSize: 14,
  },
  input_DARK: {
    flex: 1,
    height: 50,
    color: Colors.onPrimaryColor,
    fontFamily: "Poppins_300Light",
    fontSize: 14,
  },
  listContent: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
