import { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./RegistrationScreen.styles";
import { StatusBar } from "expo-status-bar";

export default function RegistrationScreen() {
  const [isShownKeybord, setIsShownKeybord] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const keyboardHide = () => {
    setIsShownKeybord(false);
    Keyboard.dismiss();
  };
  const onFormSubmit = () => {
    keyboardHide();
    if (login && email && password) {
      console.log({ login, email, password });
      setLogin("");
      setEmail("");
      setPassword("");
    }
  };

  const loginHandler = (login) => setLogin(login);
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
            <Text style={styles.formTitle}>Registration</Text>
            <TextInput
              style={styles.input}
              placeholder="Login"
              onFocus={() => setIsShownKeybord(true)}
              onChangeText={loginHandler}
              value={login}
            />
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
              style={{ ...styles.btn, marginBottom: isShownKeybord ? 32 : 112 }}
              activeOpacity={0.8}
              onPress={onFormSubmit}
            >
              <Text style={styles.btnTitle}>Registration</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
}
