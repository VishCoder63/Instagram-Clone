import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import FormicFormUploader from "./FormicFormUploader";

const AddNewPost = ({ navigation }) => {
  return (
    <View>
      <Header navigation={navigation} />
      <FormicFormUploader navigation={navigation} />
    </View>
  );
};
const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          marginLeft: "35%",
          fontWeight: "900",
          fontSize: 20,
        }}
      >
        New Post
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 50,
    // borderWidth: 1,
    // borderColor: "orange",
    flexDirection: "row",
    alignItems: "center",
  },
});
export default AddNewPost;
