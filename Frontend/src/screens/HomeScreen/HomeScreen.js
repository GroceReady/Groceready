import React, { useEffect, useState, Component } from "react";
import { SwipeListView } from "react-native-swipe-list-view";

import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import axiosCalls from "../../services/axiosCalls.js";

export default function HomeScreen(props) {
  //https://firebase.google.com/docs/reference/js/firebase.User
  const userID = props.extraData?.uid;
  const userEmail = props.extraData?.email;
  var userHH = props?.households;

  //Household Select
  function loadPantryPage(household) {
    //navigate to household that was clicked on
    props.navigation.navigate("tabNav", {
      params: {
        householdID: household.household_id,
        pantryListID: household.pantry_id,
        groceryListID: household.glist_id,
      },
      screen: "Pantry",
      initial: false,
    });
  }

  const [households, setHouseholds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [householdButtons, setHouseholdButtons] = useState([]);

  if (households.length == 0 && userHH) {
    setHouseholds(userHH);
  }
  const [enteredJoinCode, setJoinCode] = useState("");
  const [isOwnerState, setIsOwner] = useState(false);

  const loadHouseholds = () => {
    axiosCalls
      .getHouseholdsOf(userID)
      .then((householdsObj) => {
        setHouseholds(householdsObj.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadHouseholdButtons = () => {
    setHouseholdButtons(
      households.map((info) => {
        let infoCopy = {};
        Object.assign(infoCopy, info);
        return info;
      })
    );
  };

  const onLogoutPress = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
    props.navigation.navigate("Login");
  };

  function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
  //Logout
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={onLogoutPress} style={styles.headerButton}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("newUser", {
              user: props.extraData,
              setHouseholds: setHouseholds,
            });
          }}
          style={styles.headerButton}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      ),
      headerTintColor: "#fff",
      headerTitleAlign: "center",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#4F844E",
      },
    });
  }, [props.navigation]);

  function checkOwnerOfHousehold(householdID) {
    //navigate to household that was clicked on
    let userData = {
      uid: userID,
    };
    axiosCalls.checkOwner(householdID, userData).then((responseData) => {
      setIsOwner(responseData.data);
    });
  }

  function joinHousehold() {
    let joinData = {
      joinCode: enteredJoinCode,
      email: userEmail,
    };
    return axiosCalls.joinHousehold(userID, joinData).then((newItemData) => {
      setJoinCode("");
      loadHouseholds();
    });
  }

  function leaveOrDelete(householdID) {
    let hhIndex = findWithAttr(households, "household_id", householdID);
    households.splice(hhIndex, 1);
    loadHouseholdButtons(households);
    let userData = {
      uid: userID,
    };
    return axiosCalls.leaveOrDeleteHousehold(householdID, userData);
  }

  useEffect(loadHouseholds, []);
  useEffect(loadHouseholds, [props.extraData]);
  useEffect(loadHouseholdButtons, [households]);

  return (
    <View style={styles.container}>
      <SwipeListView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        data={householdButtons}
        renderItem={(data, rowMap) => (
          <View style={styles.rowFront} key={data.item.household_id}>
            <TouchableOpacity
              onPress={() => loadPantryPage(data.item)}
              style={styles.button}
              key={data.item.household_id}
            >
              <Text style={styles.itemText}>{data.item.household_name}</Text>
              <Text>Invite Code: {data.item.join_code}</Text>
            </TouchableOpacity>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack} key={data.item.household_id}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <TouchableHighlight
                onPress={() => leaveOrDelete(data.item.household_id)}
              >
                <Text style={styles.buttonText}>
                  {" "}
                  {data.item.is_owner ? "Delete" : "Leave"}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </View>
  );
}
