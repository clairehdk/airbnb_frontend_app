import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/core";

import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const AroundMeScreen = () => {
  const navigation = useNavigation();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
      } else {
        setError(true);
      }
      setIsLoading(false);
    };
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/around`
      );
      //   console.log(response.data);
      setData(response.data);
    };
    askPermission();
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Chargement...</Text>
      ) : error ? (
        <Text>Permission refusée</Text>
      ) : (
        <>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            showsUserLocation={true}
          >
            {data.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RoomScreen", { roomId: item._id });
                  }}
                >
                  <MapView.Marker
                    key={item._id}
                    coordinate={{
                      latitude: item.location[1],
                      longitude: item.location[0],
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </MapView>
        </>
      )}
      {/* {console.log(data)} */}
    </View>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
