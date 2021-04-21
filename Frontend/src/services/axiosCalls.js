import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:4567",
  baseURL: "http://ec2-54-188-139-82.us-west-2.compute.amazonaws.com:4567",
  // withCredentials: false
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getHousehold: function getHousehold(householdID) {
    return apiClient.get("/household/" + householdID).catch((error) => {
      console.log(error.response);
    });
  },
  getHouseholdsOf: function getHouseholdsOf(uid) {
    console.log("Getting households of " + uid);
    return apiClient.get("/user/" + uid + "/households").catch((error) => {
      console.log(error.response);
    });
  },
  postUser: function postUser(user) {
    console.log("posting user: " + user.id);
    return apiClient.post("/user", user).catch((error) => {
      console.log(error.response);
    });
  },
  getUser: function getUser(uid) {
    console.log("getting user");
    return apiClient.get("/user/" + uid).catch((error) => {
      console.log(error.response);
    });
  },
  getPantry: function getPantry(householdID) {
    return apiClient.get("/list/pantrylist/" + householdID).catch((error) => {
      console.log(error.response);
    });
  },
  getGroceryList: function getGroceryList(householdID) {
    return apiClient.get("/list/grocerylist/" + householdID).catch((error) => {
      console.log(error.response);
    });
  },
  updateItem: function updateItem(itemID, newItemData) {
    return apiClient.put("/item/" + itemID, newItemData).catch((error) => {
      console.log(error.response);
    });
  },
  deleteItem: function deleteItem(itemID) {
    return apiClient.delete("/item/" + itemID).catch((error) => {
      console.log(error.response);
    });
  },
  newItem: function newItem(listID, itemData) {
    return apiClient.post("/" + listID + "/item", itemData).catch((error) => {
      console.log(error.response);
    });
  },
  joinHousehold: function joinHousehold(uid, itemData) {
    return apiClient
      .post("/household/" + uid + "/join", itemData)
      .catch((error) => {
        console.log(error.response);
      });
  },
  deleteHousehold: function deleteHousehold(householdID, itemData) {
    return apiClient
      .delete("/household/" + householdID, itemData)
      .catch((error) => {
        console.log(error.response);
      });
  },
  newHousehold: function newHousehold(uid, hhData) {
    console.log("HHDATA ", uid);
    return apiClient
      .post("/household/" + uid + "/newHousehold", hhData)
      .catch((error) => {
        console.log(error.response);
      });
  },
  checkOwner: function checkOwner(householdID, uidData) {
    return apiClient
      .post("/household/" + householdID + "/checkowner", uidData)
      .catch((error) => {
        console.log(error.response);
      });
  },
  leaveOrDeleteHousehold: function leaveOrDeleteHousehold(
    householdID,
    uidData
  ) {
    return apiClient
      .post("/household/" + householdID + "/leaveordelete", uidData)
      .catch((error) => {
        console.log(error.response);
      });
  },
  moveToOtherList: function moveToOtherList(listID, moveData) {
    return apiClient.put("/" + listID + "/move", moveData).catch((error) => {
      console.log(error.response);
    });
  },
};
