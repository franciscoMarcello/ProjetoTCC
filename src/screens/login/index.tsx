import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// import { Container } from './styles';

function Login({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>login</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text> Ir para a home</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
