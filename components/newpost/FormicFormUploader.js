// npm i formik
// npm i yup

import { View, Text, Image, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { db, firebase } from "../../firebase";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required!"),
  caption: Yup.string().max(2200, "Caption has reached the character limit!"),
});
const PLACEHOLDER_IMG =
  "https://daluscapital.com/wp-content/uploads/2016/04/dummy-post-square-1-1-300x300.jpg";

const FormicFormUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  // const getUsername = () => {
  //   const user = firebase.auth().currentUser;
  //   console.log(user.uid);
  //   db.collection("users")
  //     .where("owner_uid", "===", user.uid.trim())
  //     .limit(1)
  //     .onSnapshot((snapshot) => {
  //       console.log("snapshot time");
  //       console.log(snapshot.docs);
  //       // snapshot.docs.map((doc) => {
  //       //   setCurrentLoggedInUser({
  //       //     username: doc.data().username,
  //       //     profile_pic: doc.data().profile_pic,
  //       //   });
  //       // });
  //     });
  //   return user;
  // };

  const uploadPostToFireBase = (imageUrl, caption) => {
    const uploader = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        profile_pic: currentLoggedInUser.profile_pic,
        comments: [],
        likes_by_users: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => navigation.goBack());
  };

  useEffect(() => {
    const user = firebase.auth().currentUser;
    db.collection("users")
      .where("owner_uid", "==", user.uid.trim())
      .limit(1)
      .onSnapshot((snapshot) => {
        // console.log("snapshot time");
        // console.log(snapshot.docs.map((doc) => console.log(doc.data())));
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profile_pic: doc.data().profile_pic,
          });
        });
      });
  }, []);

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        // console.log(values);
        // console.log("Form submitted successfully!!");
        // console.log(currentLoggedInUser);
        uploadPostToFireBase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => {
        return (
          <>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: validUrl.isWebUri(thumbnailUrl)
                    ? thumbnailUrl
                    : PLACEHOLDER_IMG,
                }}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "cover",
                  margin: 5,
                }}
              />
              <TextInput
                style={{ color: "white", fontSize: 20, marginLeft: 20 }}
                placeholder="Write Caption here.."
                placeholderTextColor={"gray"}
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
            <Divider width={0.5} orientation="vertical" />
            <TextInput
              onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
              style={{ color: "white", fontSize: 17 }}
              placeholder="Enter Image URL"
              placeholderTextColor="gray"
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            />
            {errors.imageUrl && (
              <Text style={{ fontSize: 15, color: "red", margin: 5 }}>
                {errors.imageUrl}
              </Text>
            )}
            <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
          </>
        );
      }}
    </Formik>
  );
};

export default FormicFormUploader;
