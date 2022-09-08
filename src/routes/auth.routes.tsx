import React from "react";
import SignIn from "../screens/SignIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <AuthStack.Screen name="SignIn" component={SignIn}   />
  </AuthStack.Navigator>
);
export default AuthRoutes;
