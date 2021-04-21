import React, { useEffect, useState, Component } from "react";
import ListScreen from "./ListScreen.js";

export default function GListScreen({ navigation, route }) {
  const props = navigation.dangerouslyGetState().routes[0].params;

  return (
    <ListScreen
      navigation={navigation}
      route={route}
      householdID={props.householdID}
      listID={props.groceryListID}
      otherListID={props.pantryListID}
      listType="grocerylist"
    ></ListScreen>
  );
}
