import React from "react";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Icon = () => {
  const navigation = useNavigation();

  return (
    <FontAwesome5
      name="airbnb"
      size={32}
      color="#EB5A62"
      onPress={() => {
        navigation.navigate("Home");
      }}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({});
