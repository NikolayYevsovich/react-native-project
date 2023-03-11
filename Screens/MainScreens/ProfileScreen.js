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
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId, nickname } = useSelector((state) => state.auth);

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
        <View style={styles.postsContainer}>
          <Text style={styles.userNickname}>{nickname}</Text>
          <AntDesign
            name="logout"
            size={24}
            color="black"
            onPress={sighOut}
            style={styles.logoutBtn}
          />

          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item.photo }} style={styles.postImage} />

                <View style={styles.postBar}>
                  <Text style={styles.postTitle}>{item.comment}</Text>
                  <View style={styles.locationBox}>
                    <EvilIcons
                      name="location"
                      size={24}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      color="black"
                    />
                    <Text>{item.locationName}</Text>
                  </View>
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
    backgroundColor: "#fff",
  },
  imege: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 147,
  },
  postsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
    flex: 1,
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
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
    color: "#212121",
  },
  userNickname: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
    color: "#212121",
    marginTop: 20,
    marginBottom: 30,
  },
  logoutBtn: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  postBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 5,
    width: 340,
    marginLeft: "auto",
    marginRight: "auto",
  },
  locationBox: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
});

export default ProfileScreen;
