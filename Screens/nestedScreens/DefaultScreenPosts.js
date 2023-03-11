import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../firebase/config";

// icons
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const getAllPost = async () => {
    await firebase
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View style={{ marginTop: 10, marginBottom: 8 }}>
              <Text style={styles.postTitle}>{item.comment}</Text>
            </View>
            <View style={styles.imageBar}>
              <FontAwesome
                name="comments"
                size={24}
                color="black"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
                style={styles.commentsIcon}
              />
              <EvilIcons
                name="location"
                size={24}
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: "auto",
                }}
                color="black"
                onPress={() => {
                  navigation.navigate("Map", {
                    latitude: item.location?.latitude,
                    longitude: item.location?.longitude,
                  });
                  console.log("ITEM", item);
                }}
              />
              <View>
                <Text
                  onPress={() => {
                    navigation.navigate("Map", {
                      latitude: item.location?.latitude,
                      longitude: item.location?.longitude,
                    });
                    console.log("ITEM", item);
                  }}
                  style={styles.locationTitle}
                >
                  {item.locationName}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  postContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  image: {
    width: 343,
    height: 240,
    objectFit: "contain",
    borderRadius: 8,
  },
  postTitle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
    color: "#212121",
  },
  imageBar: {
    display: "flex",
    flexDirection: "row",
    height: 24,
  },
  commentsIcon: {
    width: 24,
    height: 24,
  },
  locationTitle: {
    marginLeft: 5,
    textDecorationLine: "underline",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
    color: "#212121",
  },
});

export default DefaultScreenPosts;
