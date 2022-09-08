import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,

} from "react-native";

import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";

const SignIn: React.FC = () => {
  const { signed, signIn } = useContext(AuthContext);

  async function handleAcess() {
    await signIn({ email, password });
    console.log(signed);
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor={"white"}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={"white"}
      />
      <TouchableOpacity style={styles.button} onPress={handleAcess}>
        <Text style={styles.text}> Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}> Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#08090A",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderRadius: 8,
    margin: 5,
    color: "white",
  },
  button: {
    backgroundColor: "#9400D3",
    padding: 10,
    width: "80%",
    borderRadius: 8,
    margin: 5,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});
export default SignIn;
