import {
  TouchableOpacity,
  Platform,
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { db, firebase } from "../firebase";
import Post from "../components/home/Post";

const LikedPostScreen = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collectionGroup("posts").onSnapshot((snapshot) => {
      let requiredPosts = snapshot.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
      requiredPosts = requiredPosts.filter((post) =>
        post.likes_by_users.includes(firebase.auth().currentUser.email)
      );
      setPosts(requiredPosts);
    });
  }, []);
  return (
    <View style={styles.safeContainer}>
      <Header />
      <ScrollView>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <Text style={{ color: "white" }}>LikedPostScreen</Text>
    </View>
  );
};
const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}> */}
      <TouchableOpacity>
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
        Liked Post(s)
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  safeContainer: {
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "black",
    flex: 1,
  },
  container: {
    display: "flex",
    height: 50,
    // borderWidth: 1,
    // borderColor: "orange",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default LikedPostScreen;
