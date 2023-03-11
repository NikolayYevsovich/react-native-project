import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { StatusBar } from "expo-status-bar";
// icons
import { EvilIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);
  const getUserPosts = async () => {
    await firebase
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const sighOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/screen-bg.png")}
        style={styles.imege}
      >
        <Button title="Sign out" onPress={sighOut} />
        <View>
          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item.photo }} style={styles.postImage} />

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 343,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Text style={styles.postTitle}>{item.comment}</Text>
                  <EvilIcons
                    name="location"
                    size={24}
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: "auto",
                    }}
                    color="black"
                  />
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  imege: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    paddingTop: 30,
  },
  postImage: {
    width: 343,
    height: 240,
    objectFit: "contain",
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
  },
  postTitle: {
    // width: 343,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
    color: "#212121",
    // backgroundColor: "blue",
  },
});

export default ProfileScreen;
