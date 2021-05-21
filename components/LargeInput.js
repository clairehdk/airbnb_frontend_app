import React from "react";
import { TextInput, StyleSheet } from "react-native";

const LargeInput = ({ placeholder, setValue, value }) => {
  return (
    <TextInput
      style={styles.textarea}
      placeholder={placeholder}
      onChangeText={setValue}
      multiline={true}
      value={value ? value : null}
    />
  );
};

export default LargeInput;

const styles = StyleSheet.create({
  textarea: {
    height: 100,
    fontSize: 15,
    borderColor: "#EB5A62",
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    // textAlign: "center",
  },
});
