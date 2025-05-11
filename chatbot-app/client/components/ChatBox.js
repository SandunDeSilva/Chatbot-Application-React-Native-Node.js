import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import { sendMessage } from "../services/api"; // make sure this is correctly implemented

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setChat((prev) => [...prev, { type: "user", text: userMsg }]);
    setInput("");

    try {
      const res = await sendMessage(userMsg);
      setChat((prev) => [...prev, { type: "bot", text: res.data.response }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { type: "bot", text: "Error: Could not connect to server." },
      ]);
    }
  };

  return (
    <View style={styles.chatContainer}>
      <ScrollView style={styles.messages}>
        {chat.map((msg, i) => (
          <Text
            key={i}
            style={[
              styles.message,
              msg.type === "user" ? styles.user : styles.bot,
            ]}
          >
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Type your message here..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: { flex: 1, padding: 10 },
  messages: { flex: 1, marginBottom: 10 },
  message: {
    margin: 5,
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#daf1fc",
  },
  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#e6f5e6",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default ChatBox;
