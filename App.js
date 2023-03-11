import { NavigationContainer } from "@react-navigation/native";
import { useRaut } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { firebase } from "./firebase/config";
import { useState } from "react";
import Main from "./components/Main";

export default function App() {
  // const [user, setUser] = useState(null);

  // firebase.auth().onAuthStateChanged((user) => setUser(user));

  // const routing = useRaut(user);

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
