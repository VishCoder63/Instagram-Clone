import {
  TouchableOpacity,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Validator from "email-validator";
import { db, firebase } from "../../firebase";

const signUpSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required!"),
  username: Yup.string().required().min(2, "A username is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password should be atleast 8 character long! "),
});

const SignUpForm = ({ navigation }) => {
  const getRandomProfilePic = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignUp = async (email, password, username) => {
    try {
      const newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(
        "Firebase user created successfully!"
        // email,
        // password,
        // username
      );
      db.collection("users")
        .doc(newUser.user.email) //this will ensure u set ur own doc id and its not auto generated in firestore
        .set({
          owner_uid: newUser.user.uid,
          username: username,
          email: newUser.user.email,
          profile_pic: await getRandomProfilePic(),
        });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{ marginTop: 30 }}>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={(values) =>
          onSignUp(values.email, values.password, values.username)
        }
        validationSchema={signUpSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => {
          return (
            <>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.username.length < 1 || values.username.length > 2
                        ? "black"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Please enter username"
                  autoCapitalize="none"
                  // keyboardType="email-address"
                  // textContentType="emailAddress"
                  autoFocus={true}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? "black"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Please enter your email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.password.length > 0 && values.password.length < 8
                        ? "red"
                        : "black",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>
              {/* <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  margin: 5,
                }}
              >
                <Text style={{ color: "#6BB0F5" }}>Forgot password?</Text>
              </TouchableOpacity> */}
              {/* {errors.imageUrl && (
              <Text style={{ fontSize: 15, color: "red", margin: 5 }}>
                {errors.imageUrl}
              </Text>
            )} */}
              <Button
                disabled={!isValid}
                title="Sign Up"
                style={styles.button}
                onPress={handleSubmit}
              />
              <View style={styles.signupContainer}>
                <Text>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.push("LoginScreen")}
                >
                  <Text style={{ color: "#6BB0F5", marginLeft: 6 }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    padding: 12,
    backgroundColor: "#FAFAFA",
    margin: 10,
  },
  shareButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#FAFAFA",
    margin: 10,
  },
  button: {
    width: "60%",
    height: 150,
    margin: 10,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "center",
  },
});

export default SignUpForm;
