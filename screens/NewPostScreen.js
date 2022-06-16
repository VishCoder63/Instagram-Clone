import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import React from "react";
import AddNewPost from "../components/newpost/AddNewPost";

const NewPostScreen = ({ navigation }) => {
  return (
    <View style={styles.safeContainer}>
      <AddNewPost navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "black",
    flex: 1,
  },
});
export default NewPostScreen;
