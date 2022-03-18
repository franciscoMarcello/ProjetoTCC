import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/home";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
