import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome } from "@expo/vector-icons";

const Rooms = ({ data }) => {
  const navigation = useNavigation();

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
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.block}
            onPress={() => {
              navigation.navigate("RoomScreen", { roomId: item._id });
            }}
          >
            <View style={styles.rooms}>
              <ImageBackground
                style={styles.img_rooms}
                source={{ uri: item.photos[0].url }}
              >
                <Text style={styles.price}>{item.price} €</Text>
              </ImageBackground>
              <View style={styles.infos}>
                <View style={styles.infos_title}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.rating}>
                    {displayStars(item.ratingValue)}
                    <Text style={styles.review}>{item.reviews} reviews</Text>
                  </View>
                </View>
                <View>
                  <Image
                    style={styles.imgProfile}
                    source={{ uri: item.user.account.photo.url }}
                    resizeMode="contain"
                  />
                </View>
                {/* {console.log(item.user.account.photo.url)} */}
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Rooms;

const styles = StyleSheet.create({
  block: {
    // marginBottom: 10,
  },
  rooms: {
    // marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
  img_rooms: {
    // flex: 1,
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  imgProfile: {
    // flex: 1,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  price: {
    // position: "absolute",
    backgroundColor: "black",
    opacity: 0.9,
    color: "white",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
    // bottom: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  infos: {
    marginTop: 20,
    paddingBottom: 20,
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
});
