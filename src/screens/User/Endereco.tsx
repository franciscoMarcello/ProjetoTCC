import React, { useState, useContext } from "react";

import {
  Button,
  TextArea,
  Box,
  Heading,
  Icon,
  Center,
  FormControl,
} from "native-base";
import { Input } from "../../components/input";
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
        complement: complemento,
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
    <Center
      backgroundColor="#1a1c22"
      flex="1"
      alignItems="center"
      justifyContent="center"
      p={10}
    >
      <StatusBar style="light" />
      <Heading fontSize="2xl" p="4" pb="3" color="white">
        Novo Endereço
      </Heading>

      <FormControl>
        <FormControl.Label>Cidade</FormControl.Label>
        <Input onChangeText={setCity} value={city} placeholder="Porto velho" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Rua</FormControl.Label>
        <Input
          onChangeText={setStreet}
          value={street}
          placeholder="Avenida tal"
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>CEP</FormControl.Label>
        <Input onChangeText={setCep} value={cep} placeholder="7680000" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Numero</FormControl.Label>
        <Input
          onChangeText={setNumber}
          value={number}
          placeholder="64"
          keyboardType="number-pad"
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Complemento</FormControl.Label>
        <TextArea
          size="xl"
          onChangeText={setComplemento}
          value={complemento}
          placeholder="Perto do posto"
          color={"gray.100"}
          placeholderTextColor={"gray.500"}
          marginBottom="3"
        />
      </FormControl>

      <Box>
        <Button bg="#580ef6" fontSize="md" onPress={AddEndereco}>
          Adicionar endereço
        </Button>
      </Box>
    </Center>
  );
};

export default Endereco;
