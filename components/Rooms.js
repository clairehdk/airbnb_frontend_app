import React from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";

const Rooms = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.rooms}>
            <Text>{item.title}</Text>
            <View>
              <Image
                styles={styles.img_rooms}
                source={{ uri: item.photos[0].url }}
                resizeMode="contain"
              />
              {/* <FlatList
                data={item.photos}
                renderItem={({ photo }) => {
                  return <Image source={{ uri: photo.url }} />;
                }}
              /> */}
              {/* {console.log(item.photos.picture_id)} */}
              <Text>{item.price}</Text>
            </View>
            <View>
              <Image
                styles={styles.img_rooms}
                source={{ uri: item.user.account.photo }}
                resizeMode="contain"
              />
              <Text>{item.ratingValue}</Text>
              <Text>{item.reviews} reviews</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

export default Rooms;

const styles = StyleSheet.create({
  img_rooms: {
    flex: 1,
    width: 100,
    height: 100,
  },
  rooms: {
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
});
