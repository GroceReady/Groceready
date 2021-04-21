import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#F4F5F7",
    // justifyContent: "center",
  },

  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  title: {
    color: "#4F844E",
    fontSize: 36,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#4F844E",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 14,
    marginRight: 30,
    paddingLeft: 16,
    

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
    backgroundColor: "#4F844E",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 18,
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
    color: "#0350c4",
    fontWeight: "bold",
    fontSize: 16,
  },
});
