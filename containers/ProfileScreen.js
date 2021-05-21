import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ setToken, userId, userToken }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [takenPicture, setTakenPicture] = useState(null);

  const getPermissionAndPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setSelectedPicture(result.uri);
      }
    } else {
      alert("Permission d'accès à la galerie refusée");
      return;
    }
  };

  const getPermissionAndCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        setSelectedPicture(result.uri);
      }
    } else {
      alert("Permission d'accès à la caméra refusée");
      return;
    }
  };

  const sendPicture = async () => {
    try {
      // console.log("00");
      // console.log(selectedPicture);
      const tab = selectedPicture.split(".");
      // console.log(tab);

      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: `my-picture.${tab[tab.length - 1]}`,
        type: `image/${tab[tab.length - 1]}`,
      });

      console.log("01");
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <View style={styles.photo}>
          {selectedPicture ? (
            <ImageBackground
              style={styles.selectPicture}
              imageStyle={{ borderRadius: 100 }}
              source={{ uri: selectedPicture }}
            />
          ) : data.photo[0].url ? (
            <ImageBackground
              style={styles.selectPicture}
              imageStyle={{ borderRadius: 100 }}
              source={{ uri: data.photo[0].url }}
            />
          ) : (
            <Ionicons
              style={styles.icon}
              name="person"
              size={100}
              color="#E7E7E7"
            />
          )}
        </View>
        <View style={styles.gallery}>
          <TouchableHighlight onPress={getPermissionAndPhoto}>
            <FontAwesome name="photo" size={30} color="gray" />
          </TouchableHighlight>
          <TouchableHighlight onPress={getPermissionAndCamera}>
            <AntDesign name="camera" size={35} color="gray" />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.form}>
        <Input value={data.email} />
        <Input value={data.username} />
        <LargeInput value={data.description} />
      </View>
      <TouchableOpacity style={styles.butt} onPress={sendPicture}>
        <Text style={styles.button}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.butt}
        onPress={() => {
          setToken(null);
        }}
      >
        <Text style={styles.button}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginBottom: 80,
  },
  avatar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gallery: {
    marginLeft: 20,
    height: 150,
    alignItems: "center",
    justifyContent: "space-around",
  },
  photo: {
    marginTop: 30,
    marginBottom: 30,
    width: 150,
    height: 150,
    borderColor: "#EB5A62",
    borderWidth: 1,
    borderRadius: 100,
    position: "relative",
  },
  selectPicture: {
    width: 150,
    height: 150,
  },
  icon: {
    position: "absolute",
    bottom: "17%",
    left: "17%",
  },
  butt: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    textAlign: "center",
    width: 200,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: "#EB5A62",
    borderWidth: 10,
    borderWidth: 3,
    borderRadius: 33,
    fontSize: 18,
  },
});
