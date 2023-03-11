import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { firebase } from "../../firebase/config";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickname, userId } = useSelector((state) => state.auth);

  const { postId } = route.params;

  const createComment = async () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickname });
    setComment("");
  };
  const getAllPosts = async () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={allComments}
        renderItem={({ item }) => (
          <>
            <Text
              style={{
                ...styles.userName,
                marginLeft: item.nickname === nickname ? "auto" : 0,
              }}
            >
              {item.nickname}
            </Text>
            <View style={styles.postContainer}>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          </>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={{ marginBottom: 16 }}>
        <TextInput
          value={comment}
          placeholder="Comment"
          style={styles.commentInput}
          onChangeText={(value) => setComment(value)}
        />
        <FontAwesome5
          name="arrow-circle-up"
          size={34}
          style={styles.sendButton}
          onPress={createComment}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  commentInput: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    padding: 16,
    position: "relative",
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "red",
  },
  postContainer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 5,
  },
  sendButton: {
    color: "#FF6C00",
    position: "absolute",
    right: 10,
    bottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6C00",
  },
  comment: {
    fontFamily: "Roboto",
    fontSize: 13,
    color: "#212121",
  },
});

export default CommentsScreen;
