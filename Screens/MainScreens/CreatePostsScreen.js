import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { firebase } from "../../firebase/config";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [comment, setcomment] = useState("");
  const [locationName, setLocationName] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access camera was denied");
        return;
      }
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
    } catch (error) {
      console.log("Error taking photo:", error);
    }
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const post = {
      photo,
      comment,
      location: location.coords,
      locationName,
      userId,
      nickname,
    };
    console.log("post object:", post);
    const createPost = await firebase.firestore().collection("posts").add(post);
    console.log("post created:", createPost);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    const data = await firebase
      .storage()
      .ref(`postImage/${uniquePostId}`)
      .put(file);

    const processedPhoto = await firebase
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();
    return processedPhoto;
  };

  const sendPhoto = async () => {
    await uploadPostToServer();

    navigation.navigate("DefaultScreen");

    setPhoto("");
    setcomment("");
    setLocationName("");
    setLocation(null);
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image style={styles.image} source={{ uri: photo }} />
          </View>
        )}
        <TouchableOpacity style={styles.snapBtn} onPress={takePhoto}>
          <FontAwesome
            name="camera"
            size={24}
            color="white"
            style={{ zIndex: 1000 }}
          />
        </TouchableOpacity>
      </Camera>
      <View style={styles.textLabel}>
        <Text style={styles.labelText}>Upload photo</Text>
      </View>
      <TextInput
        placeholder="Description..."
        style={styles.input}
        value={comment}
        onChangeText={(value) => setcomment(value)}
      />
      <View>
        <TextInput
          placeholder="Location..."
          style={styles.inputLocation}
          value={locationName}
          onChangeText={(value) => setLocationName(value)}
        />
        <EvilIcons
          name="location"
          size={24}
          color="black"
          style={styles.icon}
        />
      </View>

      <TouchableOpacity style={styles.postBtn} onPress={sendPhoto}>
        <Text style={styles.postBtnText}>Post photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    width: 343,
    height: 240,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  snapBtn: {
    borderRadius: 50,
    padding: 18,
    backgroundColor: "#FFFFFF4D",
    zIndex: 1000,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    borderWidth: 1,
  },
  image: {
    height: 240,
    width: 343,
    zIndex: 1,
    objectFit: "contain",
  },
  postBtn: {
    width: 343,
    height: 51,
    marginTop: 32,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#fff",
  },
  labelText: {
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 8,
  },
  textLabel: {
    width: 343,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-start",
  },
  input: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",
    marginTop: 32,
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputLocation: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",
    marginTop: 32,
    position: "relative",
    paddingLeft: 28,
    fontSize: 16,
    color: "#BDBDBD",
  },
  icon: {
    position: "absolute",
    left: 0,
    bottom: 13,
  },
});

export default CreatePostsScreen;
