import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Image, Text, View, StyleSheet } from "react-native";

const Header = ({ title }) => {
  return (
    <View style={[styles.header]}>
      <Image style={[styles.logo]} source={require("../assets/logo.png")} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "600",
    color: "#929292",
  },
});
