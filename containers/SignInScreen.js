import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import axios from "axios";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";

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
        // console.log(response);
        const userToken = response.data.token;
        setToken(userToken);
        alert("Sign in completed !");
      } else {
        setError("Missign parameters.");
      }
    } catch (e) {
      if (e.response.status === 401) {
        setError("Email / Password incorrect");
      } else {
        console.log(e.response.status);
      }
    }
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Header title="Sign In" />
          <View>
            <ErrorMessage error={error} />
            <View style={styles.form}>
              <Input placeholder="email" setValue={handleEmail} />
              <Input
                placeholder="password"
                secureTextEntry={true}
                setValue={handlePass}
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
    </SafeAreaView>
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
