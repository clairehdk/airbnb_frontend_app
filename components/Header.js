import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Image, Text, View, StyleSheet, SafeAreaView } from "react-native";

const Header = ({ title }) => {
  return (
    <SafeAreaView>
      <View style={[styles.header]}>
        <Image
          style={[styles.logo]}
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
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
