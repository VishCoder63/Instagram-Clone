import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { firebase, db } from "../../firebase";

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log("Like added successfully");
      })
      .catch((err) => console.log("Error trying to add like: ", err));
  };
  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader post={post} />
      <Text>{"/n"}</Text>
      <PostImage post={post} />
      <PostFooter post={post} handleLike={handleLike} />
    </View>
  );
};

const postFooterIcons = {
  heartEmpty: "heart-o",
  heartFilled: "heart",
  comment: "comment-o",
  telegram: "telegram",
  bookmark: "bookmark-o",
};

const PostFooter = ({ post, handleLike }) => {
  const [isNewComment, setIsNewComment] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  return (
    <View>
      <View style={styles.postFooter}>
        <View style={styles.subPostFooter}>
          <TouchableOpacity onPress={() => handleLike(post)}>
            <Icon
              name={
                post.likes_by_users.includes(firebase.auth().currentUser.email)
                  ? postFooterIcons.heartFilled
                  : postFooterIcons.heartEmpty
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsNewComment((prev) => !prev)}>
            <Icon name={postFooterIcons.comment} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name={postFooterIcons.telegram} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Icon name={postFooterIcons.bookmark} />
        </TouchableOpacity>
      </View>
      <Likes post={post} />
      <Caption post={post} />
      <CommentSection
        post={post}
        isNewComment={isNewComment}
        commentsVisible={commentsVisible}
        setCommentsVisible={setCommentsVisible}
      />
      <Comments
        post={post}
        isNewComment={isNewComment}
        setIsNewComment={setIsNewComment}
        commentsVisible={commentsVisible}
      />
    </View>
  );
};

const Comments = ({ post, isNewComment, setIsNewComment, commentsVisible }) => {
  const [comment, setComment] = useState("");
  const handleCommentSubmit = () => {
    // console.log(post, comment, firebase.auth().currentUser.email);
    let userName = "";
    db.collection("users").onSnapshot((snap) => {
      userName = snap.docs
        .map((user) => ({
          email: user.data().email,
          username: user.data().username,
        }))
        .filter(
          (user) => user.email == firebase.auth().currentUser.email
        )[0].username;
      const newComment = {
        user: userName,
        comment: comment,
      };
      addCommentToDb(newComment);
    });
    const addCommentToDb = (newComment) => {
      db.collection("users")
        .doc(post.owner_email)
        .collection("posts")
        .doc(post.id)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(newComment),
        })
        .then(() => {
          console.log("Comment added successfully");
          setIsNewComment((prev) => !prev);
        })
        .catch((err) => console.log("Error trying to add Comment: ", err));
    };
  };
  return (
    commentsVisible && (
      <>
        {!isNewComment ? (
          <View>
            {post.comments.map((comment, index) => {
              return (
                <View
                  key={Math.random() * index}
                  style={{
                    marginTop: 5,
                    // borderWidth: 1,
                    // borderColor: "red",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    <Text style={{ fontWeight: "800" }}>{comment.user}</Text>
                    <Text> {comment.comment}</Text>
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <View>
            <TextInput
              style={{
                color: "white",
                fontSize: 14,
                margin: 5,
                borderWidth: 1,
                borderColor: "white",
              }}
              placeholder="  comments go here.."
              placeholderTextColor={"gray"}
              multiline={true}
              onChangeText={(text) => setComment(text)}
            />

            <Button
              onPress={handleCommentSubmit}
              title="Add Comment"
              disabled={comment.length < 2}
            />
          </View>
        )}
      </>
    )
  );
};

const Likes = ({ post }) => {
  return (
    <Text style={{ color: "white", fontWeight: "900" }}>
      {post.likes_by_users.length}{" "}
      {post.likes_by_users.length == 1 ? "like" : "likes"}
    </Text>
  );
};

const Caption = ({ post }) => {
  return (
    <View
      style={{
        marginTop: 5,
        // borderWidth: 1,
        // borderColor: "red",
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        <Text style={{ fontWeight: "800" }}>{post.user}</Text>
        <Text> {post.caption}</Text>
      </Text>
    </View>
  );
};
const Icon = ({ name }) => {
  return (
    <FontAwesome
      name={name}
      size={24}
      color={name == "heart" ? "red" : "white"}
    />
  );
  // return (
  //   <TouchableOpacity>
  //     <View>
  //       <FontAwesome name={name} size={24} color="white" />;
  //     </View>
  //   </TouchableOpacity>
};

const CommentSection = ({
  post,
  isNewComment,
  setCommentsVisible,
  commentsVisible,
}) => {
  return (
    !isNewComment && (
      <View style={{ marginTop: 5 }}>
        {post.comments.length > 0 ? (
          !commentsVisible ? (
            <Text
              style={{ color: "grey" }}
              onPress={() => setCommentsVisible((prev) => !prev)}
            >
              View {post.comments.length > 1 ? "all" : ""}{" "}
              {post.comments.length}{" "}
              {post.comments.length > 1 ? "comments" : "comment"}
            </Text>
          ) : (
            <Text
              style={{ color: "grey" }}
              onPress={() => setCommentsVisible((prev) => !prev)}
            >
              Hide all comments
            </Text>
          )
        ) : null}
      </View>
    )
  );
};

const PostHeader = ({ post }) => (
  <View style={styles.mainContainer}>
    <View style={styles.profileContainer}>
      <Image source={{ uri: post.profile_pic }} style={styles.storyImage} />
      <Text style={{ color: "white" }}>{post.user}</Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ width: "100%", height: 350, resizeMode: "cover" }}
    />
  </View>
);

const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  subPostFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "35%",
  },
  postFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
    marginBottom: 10,
    // borderWidth: 2,
    // borderColor: "red",
    paddingRight: 10,
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 2,
  },
  storyImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "orange",
  },
});
export default Post;
