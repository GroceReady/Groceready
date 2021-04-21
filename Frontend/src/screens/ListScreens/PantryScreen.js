import React from "react";

import ListScreen from "./ListScreen.js";

export default function PantryScreen({ navigation, route }) {
  const props = route.params;

  return (
    <ListScreen
      navigation={navigation}
      route={route}
      householdID={props.householdID}
      listID={props.pantryListID}
      otherListID={props.groceryListID}
      listType="pantry"
    ></ListScreen>
  );
}
