import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, SafeAreaView, Text, View } from "react-native";
import Rooms from "../components/Rooms";

export default function HomeScreen({}) {
  const [data, setData] = useState();
  const [loading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return loading ? (
    <Text>Loading en cours</Text>
  ) : (
    <SafeAreaView>
      <View>
        <Rooms data={data} />
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
