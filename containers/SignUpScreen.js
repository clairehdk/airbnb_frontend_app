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

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handlePass = (text) => {
    setPass(text);
  };
  const handleConfirmPass = (text) => {
    setConfirmPass(text);
  };
  const handleEmail = (text) => {
    setEmail(text);
  };
  const handleUsername = (text) => {
    setUsername(text);
  };
  const handleDescription = (text) => {
    setDescription(text);
  };
  const handleSubmit = async () => {
    try {
      if (email && pass && description && username && confirmPass) {
        if (pass === confirmPass) {
          const data = {
            email: email,
            username: username,
            description: description,
            password: pass,
          };
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            data
          );
          console.log(response);
          const userToken = "secret-token";
          setToken(userToken);
          alert("Inscription réussie");
        } else {
          setError("Mot de passe non-identiques.");
        }
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
      <View style={styles.container}>
        <Header title="Sign In" />
        <View>
          <Text style={styles.error}>{error && error}</Text>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChange={handleEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="username"
            onChange={handleUsername}
          />
          <TextInput
            style={styles.textarea}
            placeholder="Describe yourself in a few words"
            onChange={handleDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            onChange={handlePass}
          />
          <TextInput
            style={styles.input}
            placeholder="confirm password"
            secureTextEntry={true}
            onChange={handleConfirmPass}
          />
          <TouchableOpacity
            style={styles.butt}
            onPress={async () => {
              handleSubmit();
            }}
          >
            <Text style={styles.button}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.butt}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have a account ? Sign in</Text>
          </TouchableOpacity>
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
  textarea: {
    height: 100,
    borderColor: "#EB5A62",
    borderWidth: 1,
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
