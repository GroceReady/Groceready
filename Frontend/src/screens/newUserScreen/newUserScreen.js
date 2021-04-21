import React, { useState } from "react";
import styles from "./styles";
import axiosCalls from "../../services/axiosCalls.js";

import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Alert } from "react-native";

export default function newUserScreen(props) {
  const userID = props.route.params.user.uid
    ? props.route.params.user.uid
    : props.route.params.user.id;

  const [enteredJoinCode, setJoinCode] = useState("");
  const [newHHName, setNewHHName] = useState("");

  function joinHousehold() {
    let joinData = {
      joinCode: enteredJoinCode,
    };
    return axiosCalls.joinHousehold(userID, joinData);
  }
  function newHousehold() {
    let hhData = {
      hhName: newHHName,
    };

    return axiosCalls.newHousehold(userID, hhData);
  }

  return (
    <View style={styles.container}>
      <View></View>
      <Text style={styles.baseText}>Join a Household...</Text>

      <TextInput
        style={styles.TextInput}
        placeholderTextColor="#aaaaaa"
        placeholder="Invite code"
        onChangeText={(text) => setJoinCode(text)}
        value={enteredJoinCode}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          joinHousehold().then((newval) => {
            props.navigation.navigate("Home");
            axiosCalls.getHouseholdsOf(userID).then((households) => {
              try {
                props.route.params.setHouseholds(households.data);
              } catch {
                alert("Invalid Join Code");
                props.navigation.navigate("Home", {
                  households: households.data,
                });
              }
              props.navigation.navigate("Home");
            });
          });
        }}
      >
        <Text style={styles.buttonTitle}>Join</Text>
      </TouchableOpacity>
      <Text style={styles.single}>
        {"\n"}
        {"\n"}
        Or
        {"\n"}
        {"\n"}
      </Text>
      <Text style={styles.baseText}>Start your own!</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="#aaaaaa"
          placeholder="Household name"
          onChangeText={(text) => setNewHHName(text)}
          value={newHHName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            newHousehold().then(() => {
              axiosCalls.getHouseholdsOf(userID).then((households) => {
                try {
                  props.route.params.setHouseholds(households.data);
                } catch {
                  props.navigation.navigate("Home", {
                    households: households.data,
                  });
                }
                props.navigation.navigate("Home");
              });
            });
          }}
        >
          <Text style={styles.buttonTitle}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
