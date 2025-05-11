import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import ChatBox from "./components/ChatBox";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chatbot</Text>
      <ChatBox />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
