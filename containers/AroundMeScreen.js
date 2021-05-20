import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";

import axios from "axios";

const AroundMeScreen = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

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

    askPermission();
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
            style={{ flex: 1 }}
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
            showsUserLocation={true}
          ></MapView>
          <Text>Latitude de l'utilisateur : {coords.latitude}</Text>
          <Text>Longitude de l'utilisateur : {coords.longitude}</Text>
        </>
      )}
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
