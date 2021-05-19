import React from "react";
import { TextInput, StyleSheet } from "react-native";

const LargeInput = ({ placeholder, setValue }) => {
  return (
    <TextInput
      style={styles.textarea}
      placeholder={placeholder}
      onChangeText={setValue}
      multiline={true}
    />
  );
};

export default LargeInput;

const styles = StyleSheet.create({
  textarea: {
    height: 100,
    borderColor: "#EB5A62",
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    // textAlign: "center",
  },
});
