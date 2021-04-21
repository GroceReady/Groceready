import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
  Alert,
  Image,
  Modal,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import styles from "./styles";
import axiosCalls from "../../services/axiosCalls.js";
import Item from "./Item.js";
import InputSpinner from "react-native-input-spinner";

export default function ListScreen(props) {
  const [listID, setListID] = useState("");
  const itemsToMove = [];
  const listType = props.listType;
  const listTypeName = listType === "pantry" ? "Pantry" : "Grocery List";
  const otherListTypeName = listType === "pantry" ? "Grocery List" : "Pantry";
  const otherListScreenName =
    listType === "pantry" ? "GListScreen" : "PantryScreen";
  const householdID = props.householdID;

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  const [listName, setListName] = useState(listTypeName);

  const [itemList, setItemList] = useState([]);
  const [itemComponents, setItemComponents] = useState([]);
  const [tab, setTab] = useState(false);

  let theBigList = [];
  function loadList() {
    if (listType === "pantry") {
      axiosCalls.getPantry(householdID).then((res) => {
        setListID(props.listID);
        setListName(res.data.name);
        setItemList(res.data.items);
      });
    } else if (listType === "grocerylist") {
      axiosCalls.getGroceryList(householdID).then((res) => {
        setListID(props.listID);
        setListName(res.data.name);
        setItemList(res.data.items);
      });
    } else {
      throw new Error("GIVEN BAD GROCERY LIST TYPE");
    }
  }
  function submitNewItem() {
    let foodData = {
      name: newItemName,
      quantity: newItemQuantity,
    };
    return axiosCalls.newItem(listID, foodData).then((newItemData) => {
      setItemList(itemList.concat(newItemData.data));
      setNewItemName("");
      setNewItemQuantity(1);
    });
  }

  function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  function deleteItem(selectedItemID) {
    let itemIndex = findWithAttr(itemList, "item_id", selectedItemID);
    let itemName = itemList[itemIndex].item_name;
    let newItemList = [...itemList];
    newItemList.splice(itemIndex, 1);
    setItemList(newItemList);
    axiosCalls.deleteItem(selectedItemID); //.then(() => { });
  }
  function checkItem(itemID) {
    if (!theBigList.includes(itemID)) {
      theBigList = [...theBigList, itemID];
    } else {
      theBigList = theBigList.filter((a) => a !== itemID);
    }
    setSelectedItems(theBigList);
  }

  function displayList() {
    let newItemComponents = [];
    itemList.forEach((itemData) => {
      const checkSelf = () => checkItem(itemData.item_id);
      const deleteSelf = () => deleteItem(itemData.item_id);
      itemData.checkSelf = checkSelf;
      newItemComponents.push(itemData);
    });
    setItemComponents(newItemComponents);
  }

  function loadOtherListPage() {
    props.navigation.navigate(otherListScreenName, {
      householdID: householdID,
      pantryListID: listType === "pantry" ? props.listID : props.otherListID,
      groceryListID: "pantry" ? props.otherListID : props.listID,
    });
  }

  function moveToOtherPage() {
    let moveData = {
      otherListID: props.otherListID,
      itemList: selectedItems,
    };
    selectedItems.forEach((selectedItem) => {
      let itemIndex = findWithAttr(itemList, "item_id", selectedItem);
      itemList.splice(itemIndex, 1);
    });
    setItemList(itemList);
    setSelectedItems([]);
    axiosCalls.moveToOtherList(listID, moveData);
    displayList();
  }

  useEffect(loadList, []);
  useEffect(displayList, [itemList]);
  useEffect(() => {
    const tabNav = props.navigation.addListener("tabPress", (e) => {
      setListID(listID);
      loadList();
      displayList();
      setTab(!tab);
      setListID(listID);
    });
    return tabNav;
  }, [tab]);

  useEffect(() => {
    props.navigation.dangerouslyGetParent().setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
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
  }, [listID]);
  return (
    <View style={styles.container}>
      <SwipeListView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        data={itemComponents}
        renderItem={(data, rowMap) => (
          <View style={styles.rowFront} key={data.item.item_id}>
            <Item itemData={data.item} checkSelf={data.item.checkSelf} />
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack} key={data.item.item_id}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <TouchableHighlight onPress={() => deleteItem(data.item.item_id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableHighlight>
            </View>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
      <View style={styles.footerView}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.buttonCloseModal}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Image source={require("./icons8-delete-16.png")} />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  placeholder="Food Name"
                  onChangeText={(text) => setNewItemName(text)}
                  value={newItemName}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <InputSpinner
                  value={newItemQuantity}
                  onChange={(value) => setNewItemQuantity(value)}
                  min={1}
                  textColor={"#000000"}
                  color={"#25863f"}
                  background={"#EEFFD0"}
                  rounded={false}
                  showBorder
                />
                <Button
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    submitNewItem().then(() => {
                      setModalVisible(!modalVisible);
                    });
                  }}
                  title="Add"
                ></Button>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={styles.button} onPress={moveToOtherPage}>
            <Text style={styles.bigButtonText}>
              Move selected items to {otherListTypeName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
