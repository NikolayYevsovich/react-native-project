import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imege: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,

    height: 50,
    color: "#BDBDBD",
    fontSize: 16,
    padding: 15,
    backgroundColor: "#F6F6F6",
  },
  form: {
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  formTitle: {
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginBottom: 33,
    marginTop: 32,
  },
  navLink: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
