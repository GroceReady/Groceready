import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    height: 500,
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  input: {
    height: 50,
    width: 200,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    margin: 10,
  },
  headerTitle: {
    backgroundColor: "#FFCA48",
  },
  headerButton: {
    borderRadius: 5,
    //backgroundColor: "#FFCA48",
    //height: 60,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  button: {
    height: 70,
    borderRadius: 5,
    backgroundColor: "#FFCA48",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  joinButton: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#FFCA48",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  itemText: {
    color: "#326532",
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },

  headerStyle: {
    backgroundColor: "#4F844E",
    paddingTop: 20,
    paddingBottom: 20,
  },

  /*https://github.com/jemise111/react-native-swipe-list-view*/
  rowFront: {
    margin: 10,
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 70,
    width: 290,
  },
  rowBack: {
    margin: 10,
    height: 70,
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
