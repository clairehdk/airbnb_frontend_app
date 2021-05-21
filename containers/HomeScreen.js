import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import Rooms from "../components/Rooms";

export default function HomeScreen({}) {
  const [data, setData] = useState({});
  const [loading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <Image source={{ uri: data.photos[0].url }} /> */}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
