import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
    console.log("posts", posts);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Button
              title="Map"
              onPress={() =>
                navigation.navigate("Map", {
                  latitude: item.location?.latitude,
                  longitude: item.location?.longitude,
                })
              }
              style={{ width: 40 }}
            />
            <Button
              title="Commenst"
              onPress={() => navigation.navigate("Comments")}
              style={{ width: 40 }}
            />
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
  },
  postContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  image: {
    width: 343,
    height: 240,
  },
});

export default DefaultScreenPosts;
