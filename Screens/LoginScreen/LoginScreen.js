import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./LoginScreen.styles";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen({ navigation }) {
  const [isShownKeybord, setIsShownKeybord] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const keyboardHide = () => {
    setIsShownKeybord(false);
    Keyboard.dismiss();
  };
  const onFormSubmit = () => {
    keyboardHide();
    if (email && password) {
      console.log({ email, password });
      setEmail("");
      setPassword("");
    }
  };

  const emailHandler = (email) => setEmail(email);
  const passwordHandler = (password) => setPassword(password);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={styles.imege}
          source={require("../../assets/images/screen-bg.png")}
        >
          <View style={styles.form}>
            <Text style={styles.formTitle}>Login</Text>
            <TextInput
              style={{ ...styles.input, marginTop: 16 }}
              placeholder="Email"
              onFocus={() => setIsShownKeybord(true)}
              onChangeText={emailHandler}
              value={email}
            />
            <TextInput
              style={{ ...styles.input, marginTop: 16 }}
              placeholder="Password"
              secureTextEntry={true}
              onFocus={() => setIsShownKeybord(true)}
              onChangeText={passwordHandler}
              value={password}
            />
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={onFormSubmit}
            >
              <Text style={styles.btnTitle}>Login</Text>
            </TouchableOpacity>
            <Text
              style={{
                ...styles.navLink,
                marginBottom: isShownKeybord ? 32 : 112,
              }}
              onPress={() => navigation.navigate("Register")}
            >
              New to application? Sign Up
            </Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
}
