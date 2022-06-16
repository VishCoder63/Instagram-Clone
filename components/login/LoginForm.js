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
import { firebase } from "../../firebase";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password should be atleast 8 character long! "),
});

const LoginForm = ({ navigation }) => {
  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Firebase login successful!", email, password);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{ marginTop: 30 }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onLogin(values.email, values.password)}
        validationSchema={loginSchema}
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
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? "black"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Phone number, username or email"
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
              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  margin: 5,
                }}
              >
                <Text style={{ color: "#6BB0F5" }}>Forgot password?</Text>
              </TouchableOpacity>
              {/* {errors.imageUrl && (
              <Text style={{ fontSize: 15, color: "red", margin: 5 }}>
                {errors.imageUrl}
              </Text>
            )} */}
              <Button
                disabled={!isValid}
                title="Log in"
                style={styles.button}
                onPress={handleSubmit}
              />
              <View style={styles.signupContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.push("SignupScreen")}
                >
                  <Text style={{ color: "#6BB0F5", marginLeft: 6 }}>
                    Sign up
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

export default LoginForm;
