import React from "react";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export type StackParamsList ={
  SignIn:undefined;
  SignUp:undefined
}
const AuthStack = createNativeStackNavigator<StackParamsList>();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <AuthStack.Screen name="SignIn" component={SignIn}   />
    <AuthStack.Screen name="SignUp" component={SignUp}   />
  </AuthStack.Navigator>
);
export default AuthRoutes;
