import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import PantryScreen from "./src/screens/ListScreens/PantryScreen.js";
import newUserScreen from "./src/screens/newUserScreen/newUserScreen.js";
import GListScreen from "./src/screens/ListScreens/GListScreen.js";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen/ForgotPasswordScreen.js";
import { decode, encode } from "base-64";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  //Logout
  const onLogoutPress = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
    RootNavigation.navigate("Login");
  };
  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return subscriber;
  }, []);

  if (loading) {
    return <></>;
  }
  function tabNav() {
    return (
      <Tab.Navigator initialRouteName={"Pantry"}>
        <Tab.Screen
          name="Pantry"
          options={{
            // title: 'My profile',
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("./pantry.jpeg")}
                />
              );
            },
          }}
        >
          {(props) => <PantryScreen {...props} extraData={"Pantry"} />}
        </Tab.Screen>
        <Tab.Screen
          name="Groceries"
          options={{
            // title: 'My profile',
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("./glist.jpeg")}
                />
              );
            },
          }}
        >
          {(props) => <GListScreen {...props} extraData={"Groceries"} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  // https://reactnavigation.org/docs/screen-options-resolution/
  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Pantry";
    switch (routeName) {
      case "Pantry":
        return "Pantry";
      case "Groceries":
        return "Grocery List";
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        <Stack.Screen
          name="Home"
          options={{
            title: "Households",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
          }}
        >
          {(props) => <HomeScreen {...props} extraData={user} />}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="newUser" component={newUserScreen} />

        <Stack.Screen
          name="tabNav"
          component={tabNav}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
