import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { USERS } from "../../data/users";

const Stories = ({ users }) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users.length > 0
          ? users.map((story, index) => (
              <View
                key={Date.now() * Math.random()}
                style={{ display: "flex" }}
              >
                <Image
                  key={Date.now() * Math.random()}
                  style={styles.storyImage}
                  source={{ uri: story.image }}
                />
                <Text style={styles.userName} key={Date.now() * Math.random()}>
                  {story.user.length > 11
                    ? story.user.slice(0, 10).toLowerCase() + "..."
                    : story.user.toLowerCase()}
                </Text>
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    color: "white",
    textAlign: "center",
    marginRight: 15,
    marginTop: 5,
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 3,
    borderColor: "orange",
  },
});

export default Stories;
