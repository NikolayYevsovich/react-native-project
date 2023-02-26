import { Text, View, StyleSheet } from "react-native";

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CreateScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreatePostsScreen;
