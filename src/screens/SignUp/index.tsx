import React, { useState, useContext } from "react";
import { ActivityIndicator } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  Box,
  Button,
  Text,
  Center,
  Heading,
  FormControl,
  Icon,
} from "native-base";
import { Input } from "../../components/input";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

const SignUp: React.FC = () => {
  const { signUp, loadingAuth, error } = useContext(AuthContext);
  const navigation = useNavigation();

  async function handleRegistre() {
    if (password != ConfirmPassword) {
    } else {
      await signUp({ email, password, phone, name });
    }
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  return (
    <Box flex="1" backgroundColor="#1a1c22" p={10} justifyContent="center">
      <StatusBar style="light" />
      <Heading color="white">Cadastro</Heading>
      <FormControl>
        <FormControl.Label>Nome</FormControl.Label>
        <Input
          onChangeText={setName}
          value={name}
          placeholder="Nome"
          InputLeftElement={
            <Icon
              as={<AntDesign name="idcard" />}
              size={5}
              color="gray.200"
              ml={2}
            />
          }
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="placeholder@gmail.com"
          keyboardType="email-address"
          InputLeftElement={
            <Icon
              as={<Entypo name="email" />}
              size={5}
              color="gray.200"
              ml={2}
            />
          }
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Telefone</FormControl.Label>
        <Input
          onChangeText={setPhone}
          value={phone}
          placeholder="99 9999 9999"
          keyboardType="phone-pad"
          autoCapitalize="none"
          InputLeftElement={
            <Icon
              as={<Entypo name="phone" />}
              size={5}
              color="gray.200"
              ml={2}
            />
          }
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Senha</FormControl.Label>
        <Input
          onChangeText={setPassword}
          value={password}
          placeholder="*********"
          secureTextEntry
          autoCapitalize="none"
          InputLeftElement={
            <Icon
              as={<Entypo name="lock" />}
              size={5}
              color="gray.200"
              ml={2}
            />
          }
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Confirmação de senha</FormControl.Label>
        <Input
          onChangeText={setConfirmPassword}
          value={ConfirmPassword}
          placeholder="*********"
          secureTextEntry
          autoCapitalize="none"
          InputLeftElement={
            <Icon
              as={<Entypo name="lock" />}
              size={5}
              color="gray.200"
              ml={2}
            />
          }
        />
      </FormControl>

      <Button mb="3" mt="3" bg="#580ef6" onPress={handleRegistre}>
        {loadingAuth ? (
          <ActivityIndicator size={25} color="#fff" />
        ) : (
          <Text color="white"> Cadastrar</Text>
        )}
      </Button>
      <Button variant="link" onPress={() => navigation.navigate("SignIn")}>
        <Text color="white"> Já póssui conta? Logar</Text>
      </Button>

      <Box>{error ? <Text>{error}</Text> : null}</Box>
    </Box>
  );
};

export default SignUp;
