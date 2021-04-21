import { StyleSheet } from "react-native";
import { TextInput } from 'react-native-paper';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F4F5F7",
      alignItems: "center",
      justifyContent: "center",
    },

    baseText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: "#4F844E"
    },

    block: {
      flex: 1,
      backgroundColor: "#F4F5F7",
      alignItems: "center",
      justifyContent: "center",
    },
   
    image: {
      marginBottom: 40,
    },
   
    inputView: {
      backgroundColor: "#FFC0CB",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
   
    TextInput: {
      padding: 10,
      fontSize: 20,
      borderWidth: 1,
      marginBottom:15,
      marginTop:15,
      width: 250,
      height: 44,
      borderRadius: 10,
      borderColor: '#4F844E',
    },

    button: {
      backgroundColor: "#FFCA48",
      width: 150,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 5,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      padding: 10
    },

    buttonTitle: {
      color: "#4F844E",
      fontWeight: "bold"
    },
    single: {
      fontWeight: 'bold',
      fontSize: 20,
      color: "#4F844E"
    }
   
  });