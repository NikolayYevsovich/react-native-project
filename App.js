import { NavigationContainer } from "@react-navigation/native";
import { useRaut } from "./router";

export default function App() {
  const routing = useRaut(true);
  return <NavigationContainer>{routing}</NavigationContainer>;
}
