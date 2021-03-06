import React from "react";
import { useRoute } from "@react-navigation/core";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView from "react-native-maps";

const RoomScreen = () => {
  const [data, setData] = useState();
  const [loading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);
  const [coords, setCoords] = useState();
  const [error, setError] = useState("");
  const { params } = useRoute();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const displayStars = (value) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        stars.push(
          <FontAwesome name="star" size={24} color="goldenrod" key={i} />
        );
      } else {
        stars.push(<FontAwesome name="star" size={24} color="gray" key={i} />);
      }
    }
    return stars;
  };
  return loading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <View>
        <Image style={styles.img} source={{ uri: data.photos[0].url }} />
        <Text style={styles.price}>{data.price} €</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infos}>
          <View style={styles.infos_title}>
            <Text style={styles.title} numberOfLines={1}>
              {data.title}
            </Text>
            <View style={styles.rating}>
              {displayStars(data.ratingValue)}
              <Text style={styles.review}>{data.reviews} reviews</Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.imgProfile}
              source={{ uri: data.user.account.photo.url }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View>
          <Text
            onPress={() => {
              setDisplayAllText(!displayAllText);
            }}
            numberOfLines={!displayAllText ? 3 : null}
            style={styles.description}
          >
            {data.description}
          </Text>
        </View>
        <MapView
          style={{ width: "100%", height: 250, marginTop: 20 }}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          //   showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
          />
        </MapView>
      </View>
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  img: {
    position: "relative",
    // flex: 1,
    width: 500,
    height: 250,
  },
  price: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.9,
    color: "white",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    fontSize: 20,
    bottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  info: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontWeight: "500",
    fontSize: 19,
    marginTop: 10,
    marginBottom: 10,
  },
  infos: {
    marginTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "red",
    flexDirection: "row",
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  infos_title: {
    width: "70%",
  },
  rating: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  review: {
    marginLeft: 5,
    color: "#BBBBBB",
  },
  description: {
    lineHeight: 20,
    fontSize: 15,
  },
  imgProfile: {
    // flex: 1,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
