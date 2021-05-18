import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Header from "../components/Header";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handlePass = (text) => {
    setPass(text);
  };
  const handleEmail = (text) => {
    setEmail(text);
  };
  const handleSubmit = async () => {
    try {
      if (email && pass) {
        const data = {
          email: email,
          password: pass,
        };
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          data
        );
        console.log(response);
        const userToken = "secret-token";
        setToken(userToken);
        alert("Connexion réussie");
      } else {
        setError("Veuillez remplir les champs manquants.");
      }
    } catch (e) {
      if (e.response.status === 401) {
        setError("Email / Mot de passe incorrect");
      } else {
        console.log(e.response.status);
      }
    }
  };
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <Header title="Sign In" />
        <View>
          <Text style={styles.error}>{error && error}</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={handleEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={handlePass}
            />
          </View>
          <View style={styles.center}>
            <TouchableOpacity
              // disabled={email && pass ? false : true}
              style={styles.butt}
              onPress={async () => {
                handleSubmit();
              }}
            >
              <Text style={styles.button}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.butt}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  form: {
    marginTop: 50,
    height: 200,
  },
  input: {
    width: 300,
    fontSize: 15,
    marginBottom: 20,
    padding: 10,
    borderBottomColor: "#EB5A62",
    borderBottomWidth: 1,
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
  error: {
    color: "#EB5A62",
    textAlign: "center",
  },
});
