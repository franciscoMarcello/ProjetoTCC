import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Input, Button } from "native-base";
import api from "../../service/auth";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

const Endereco: React.FC = () => {
  async function AddEndereco() {
    try {
      const response = api.post("/customer/endereco", {
        street: street,
        number: number,
        city: city,
        cep: cep,
        customerId: user.id,
      });

      setStreet(""), setCity(""), setCep(""), setNumber("");
    } catch (err) {
      console.log(err);
    }
  }
  const { user } = useContext(AuthContext);

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text>{user.id}</Text>
      <Input
        size="xl"
        onChangeText={setCity}
        value={city}
        placeholder="Cidade"
        color={"white"}
      />
      <Input
        size="xl"
        onChangeText={setStreet}
        value={street}
        placeholder="Rua"
        color={"white"}
      />
      <Input
        size="xl"
        onChangeText={setCep}
        value={cep}
        placeholder="Cep"
        color={"white"}
      />
      <Input
        size="xl"
        onChangeText={setNumber}
        value={number}
        placeholder="Numero"
        color={"white"}
      />
      <View>
        <Button onPress={AddEndereco}>Click Me</Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#08090A",
    color: "#ffff",
  },
  text: {
    color: "#fff",
  },
});

export default Endereco;
