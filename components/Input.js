import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, setValue, secureTextEntry, value }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={setValue}
      secureTextEntry={secureTextEntry}
      value={value ? value : null}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: 300,
    fontSize: 15,
    marginBottom: 20,
    padding: 10,
    borderBottomColor: "#EB5A62",
    borderBottomWidth: 1,
  },
});
