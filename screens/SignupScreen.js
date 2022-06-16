import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/signup/SignupForm";

const SignupScreen = ({ navigation }) => {
  const INSTAGRAM_LOGO =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQUhs_eNHBPl_dLktcWUaeJXqyvli55tBNBA&usqp=CAU";
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: INSTAGRAM_LOGO }}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <SignUpForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: "center",
  },
});

export default SignupScreen;
