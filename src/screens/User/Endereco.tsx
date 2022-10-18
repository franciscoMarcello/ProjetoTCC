import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Input, Button, TextArea, Box, Heading } from "native-base";
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
  const [complemento, setComplemento] = useState("");

  return (
    <Box
      backgroundColor="#1a1c22"
      flex="1"
      alignItems="center"
      justifyContent="center"
    >
      <StatusBar style="light" />
      <Heading fontSize="xl" p="4" pb="3" color="white">
        Novo Endereço
      </Heading>
      <Box width="80" pb="4">
        <Input
          size="xl"
          onChangeText={setCity}
          value={city}
          placeholder="Cidade"
          color={"white"}
          marginBottom="3"
        />
        <Input
          size="xl"
          onChangeText={setStreet}
          value={street}
          placeholder="Rua"
          color={"white"}
          marginBottom="3"
        />
        <Input
          size="xl"
          onChangeText={setCep}
          value={cep}
          placeholder="Cep"
          color={"white"}
          marginBottom="3"
        />
        <Input
          size="xl"
          onChangeText={setNumber}
          value={number}
          placeholder="Numero"
          color={"white"}
          marginBottom="3"
        />
        <TextArea
          size="xl"
          onChangeText={setComplemento}
          value={complemento}
          placeholder="Complemento"
          color={"white"}
          marginBottom="3"
        />
      </Box>
      <Box>
        <Button bg="#580ef6" fontSize="md" onPress={AddEndereco}>
          Adicionar endereço
        </Button>
      </Box>
    </Box>
  );
};

export default Endereco;
