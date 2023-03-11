import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRaut } from "../router";
import { firebase } from "../firebase/config";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { authStateCahngeUser } from "../redux/auth/authOperations";

const Main = () => {
  //   const [user, setUser] = useState(null);
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, []);

  //   firebase.auth().onAuthStateChanged((user) => setUser(user));
  const routing = useRaut(stateChange);
  return (
    <NavigationContainer>
      {routing}
      <StatusBar style="auto" backgroundColor="transparent" />
    </NavigationContainer>
  );
};

export default Main;
