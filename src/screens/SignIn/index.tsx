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
  Image,
} from "native-base";
import { Input } from "../../components/input";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

const SignIn: React.FC = () => {
  const { signIn, loadingAuth, error } = useContext(AuthContext);
  const navigation = useNavigation();

  async function handleAcess() {
    await signIn({ email, password });
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box flex="1" backgroundColor="#1a1c22" p={10} justifyContent="center">
      <StatusBar style="light" />
      <Box alignItems="center" mb="5">
        <Image
          source={require("../../assets/images/logo.png_300.png")}
          alt="logo"
          size={200}
          resizeMode="contain"
          rounded={100}
        />
      </Box>

      <FormControl>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="placeholder@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
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
      <Button mb="3" mt="3" bg="#580ef6" onPress={handleAcess}>
        {loadingAuth ? (
          <ActivityIndicator size={25} color="#fff" />
        ) : (
          <Text color="white"> Entrar</Text>
        )}
      </Button>
      <Button variant="link" onPress={() => navigation.navigate("SignUp")}>
        <Text color="white"> Criar conta</Text>
      </Button>

      <Box alignItems="center">
        {error ? (
          <Text fontSize="xl" color="red.500">
            {error}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
};

export default SignIn;
