import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { db, firebase } from "../../firebase";

const BottomTabs = ({ icons }) => {
  const [activeTabs, setActiveTab] = useState("Home");
  const [profilePicLogged, setProfilePicLogged] = useState("");
  const onSignout = async () => {
    try {
      await firebase.auth().signOut();
      console.log("Signed out successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  // db.collection("users").doc(firebase.auth().currentUser.email);
  //To find profile pic of loggedin User
  useEffect(() => {
    const loggedInEmail = firebase.auth().currentUser.email;
    db.collection("users").onSnapshot((snap) => {
      let user = snap.docs.map((user) => ({
        email: user.data().email,
        pic: user.data().profile_pic,
      }));
      user = user.filter((user) => user.email == loggedInEmail);
      setProfilePicLogged(user[0].pic);
      // console.log("user", user);
    });
  }, []);

  const Icon = ({ curr_icon }) => {
    // console.log(curr_icon.inactive)
    return (
      <TouchableOpacity
        onPress={
          curr_icon.name == "Profile"
            ? () => onSignout()
            : () => setActiveTab(curr_icon.name)
        }
      >
        <Image
          source={{
            uri:
              curr_icon.name == "Profile"
                ? profilePicLogged
                : curr_icon.name == activeTabs
                ? curr_icon.active
                : curr_icon.inactive,
          }}
          style={[
            styles.icon,
            curr_icon.name == "Profile" ? styles.profilePic : null,
          ]}
          // style={
          //   curr_icon.name == "Profile"
          //     ? styles.icon
          //     : [styles.icon, styles.profilePic]
          // }
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <Icon key={index} curr_icon={icon} />
      ))}
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  profilePic: {
    borderWidth: 2,
    borderColor: "orange",
    borderRadius: 50,
  },
});

export const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel.png",
  },
  {
    name: "Shop",
    active:
      "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png",
  },
  {
    name: "Profile",
    // active:
    //   "https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj",
    // inactive:
    //   "https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj",
  },
];
