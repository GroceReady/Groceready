import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import axiosCalls from "../../services/axiosCalls.js";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#4F844E",
      },
      headerLeft: null,
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const onLoginPress = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (user.emailVerified === false) {
          alert(
            "Your account has not been verified. Please verify your email."
          );
        } else {
          const uid = user.uid;
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                alert("User does not exist.");
                return;
              }
              const firebase_user = firestoreDocument.data();
              let uid = firebase_user.uid;
              axiosCalls.getUser(uid).then((user) => {
                navigation.navigate("Home", { user: user });
              });
            })
            .catch((error) => {
              alert(error);
            });
        }
      } else {
      }
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error);
      });
  };

  const forgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("./family.png")}
        resizeMode={"cover"}
        style={{ width: "100%", height: 200, backgroundColor: "red" }}
      />
      <Text style={styles.subtitle}>Eat Well, Together</Text>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          aria-label="email"
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          aria-label="password"
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
          <Text onPress={forgotPassword} style={styles.footerLink}>
            Forgot Password?
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
