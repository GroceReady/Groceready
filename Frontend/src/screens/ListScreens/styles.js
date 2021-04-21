import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 0,
    alignItems: "center",
    borderBottomWidth: 0,
  },
  checkBoxContainer: {
    backgroundColor: "white",
    height: 75,
    justifyContent: "center",
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
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
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  scrollContainer: {
    height: 450,
  },

  bigButtonText: {
    color: "#326532",
    fontWeight: "bold",
    fontSize: 20,
  },
  headerStyle: {
    backgroundColor: "#4F844E",
    paddingTop: 20,
    paddingBottom: 20,
  },

  /*https://github.com/jemise111/react-native-swipe-list-view*/
  rowFront: {
    margin: 10,
    //flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    // borderBottomColor: "black",
    // borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: "center",
    height: 75,
    width: 290,
  },
  rowBack: {
    margin: 10,
    height: 75,
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
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  spinner: {
    alignContent: "center",
    minWidth: 110,
    maxWidth: 110,
    minHeight: 30,
    maxHeight: 50,
  },
  itemText: {
    flex: 1,
    flexWrap: "wrap",
    color: "#326532",
    fontWeight: "bold",
    fontSize: 18,
    textAlignVertical: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  buttonCloseModal: {
    marginLeft: 300,
    marginBottom: 0,
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
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});