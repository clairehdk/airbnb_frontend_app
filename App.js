import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import RoomScreen from "./containers/RoomScreen";
import HeaderIcon from "./components/HeaderIcon";
import { SafeAreaView, StyleSheet } from "react-native";
import AroundMeScreen from "./containers/AroundMeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn">
            {(props) => <SignInScreen {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {(props) => <SignUpScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "#EB5A62",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    // tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: <HeaderIcon />,
                      }}
                    >
                      <Stack.Screen name="Home" options={{}}>
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{ headerLeft: false }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="RoomScreen"
                        options={{
                          headerLeft: () => (
                            <AntDesign
                              name="arrowleft"
                              size={24}
                              color="black"
                            />
                          ),
                        }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Around Me"
                  options={{
                    // tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <EvilIcons name="location" size={24} color="black" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: <HeaderIcon />,
                      }}
                    >
                      <Stack.Screen name="Home" options={{}}>
                        {() => <AroundMeScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="My profile"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"person-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
