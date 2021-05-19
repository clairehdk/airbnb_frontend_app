import React from "react";
import { Text, StyleSheet } from "react-native";

const ErrorMessage = ({ error }) => {
  return <Text style={styles.error}>{error}</Text>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    marginTop: 10,
    marginBottom: 20,
    color: "#EB5A62",
    textAlign: "center",
  },
});
