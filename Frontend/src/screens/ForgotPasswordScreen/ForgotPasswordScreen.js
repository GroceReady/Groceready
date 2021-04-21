import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  //Add Header Options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Forgot Password",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#4F844E",
      },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const resetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        alert(
          "A password reset email will be sent if you are a registered user"
        );
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={() => resetPassword()}>
          <Text style={styles.buttonText}>Request Password Reset</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            Return to Login
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
