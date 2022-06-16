import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import firebase from "firebase";

const Header = ({ navigation }) => {
  const onSignout = async () => {
    try {
      await firebase.auth().signOut();
      console.log("Signed out successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require("../../assets/header-logo.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image
            style={styles.icons}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.icons}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          {/* Unread notification box */}
          {/* <View style={styles.unreadBox}>
            <Text style={styles.unreadText}>11</Text>
          </View> */}
          <Image
            style={styles.icons}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
  icons: {
    width: 35,
    height: 35,
    marginRight: 10,
    resizeMode: "contain",
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  iconsContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  unreadBox: {
    backgroundColor: "red",
    width: 25,
    height: 22,
    borderRadius: 10,
    position: "absolute",
    left: 12,
    top: -7,
    // bottom: -1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadText: {
    color: "white",
    fontWeight: "600",
  },
});

export default Header;
