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
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import axios from "axios";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";
import ErrorMessage from "../components/ErrorMessage";

export default function SignUpScreen({ setToken, setId }) {
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
          // console.log(response.data);
          const userToken = response.data.token;
          setToken(userToken);
          setId(response.data.id);
        } else {
          setError("Non-identical password.");
        }
      } else {
        setError("Missing parameters.");
      }
    } catch (e) {
      setError(e.response.data.error);
    }
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Header title="Sign Up" />
          <ErrorMessage error={error} />
          <View>
            <Input placeholder="email" setValue={handleEmail} />
            <Input placeholder="username" setValue={handleUsername} />
            <LargeInput
              placeholder="Describe yourself in a few words"
              setValue={handleDescription}
            />
            <Input
              placeholder="password"
              setValue={handlePass}
              secureTextEntry={true}
            />
            <Input
              placeholder="confirm password"
              setValue={handleConfirmPass}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.butt}
              onPress={async () => {
                handleSubmit();
              }}
            >
              <Text style={[styles.button]}>Sign up</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // marginLeft: 30,
    // marginRight: 30,
  },
  butt: {
    marginTop: 0,
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
    marginTop: 40,
  },
});
