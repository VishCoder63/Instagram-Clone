import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";

import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
// import { POSTS } from "../data/posts";
import BottomTabs, { bottomTabIcons } from "../components/home/BottomTabs";
import { db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection("users").onSnapshot((snap) => {
      // console.log("here in homescreen users!");
      setUsers(
        snap.docs.map((user) => ({
          user: user.data().username,
          image: user.data().profile_pic,
        }))
      );
    });

    db.collectionGroup("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
    });
  }, []);
  return (
    <View style={styles.safeContainer}>
      <Header navigation={navigation} />
      <Stories users={users} />
      <Text>{"/n"}</Text>
      <ScrollView>
        {/* {console.log("posts", posts)} */}
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
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

export default HomeScreen;
