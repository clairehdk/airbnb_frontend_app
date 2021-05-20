import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const AroundMeScreen = () => {
  useEffect(() => {
    const fetchData = async () => {
      const reponse = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms/around"
      );
    };
    fetchData();
  }, []);
  return <Text>Around me</Text>;
};

export default AroundMeScreen;
