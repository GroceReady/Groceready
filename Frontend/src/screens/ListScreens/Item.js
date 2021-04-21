import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import axiosCalls from "../../services/axiosCalls.js";
import { CheckBox } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";

export default function Item(props) {
  function updateItemQuantity(value) {
    updateItem({ quantity: value });
  }

  function updateItem(newItemData) {
    axiosCalls.updateItem(props.itemData.item_id, newItemData);
  }

  //https://awesomeopensource.com/project/marcocesarato/react-native-input-spinner
  const [checked, setChecked] = useState(false);

  return (
    <View key={props.itemData.item_id + "_ITEM"} style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{props.itemData.item_name}</Text>

        {/* {https://github.com/marcocesarato/react-native-input-spinner} */}
        <View style={styles.container}>
          <InputSpinner
            value={props.itemData.quantity}
            style={styles.spinner}
            // skin="round"
            onChange={(value) => updateItemQuantity(value)}
            textColor={"#000000"}
            buttonTextColor={"#000"}
            min={1}
            max={99}
            color={"white"}
          />
        </View>
        <View
          style={{
            backgroundColor: checked ? "#FFCA48" : "#D5D5D5",
            height: 75,
            width: 20,
            alignItems: "center", // Centered horizontally
            justifyContent: "center",
            flex: 0.5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <CheckBox
            checkedColor="#8E44AD"
            uncheckedIcon={<Image source={require("./test2.png")} />}
            checkedIcon={<Image source={require("./test2.png")} />}
            status={checked ? "checked" : "unchecked"}
            onPress={props.checkSelf}
            onPressIn={() => {
              setChecked(!checked);
            }}
            checked={checked}
          />
        </View>
      </View>
    </View>
  );
}
