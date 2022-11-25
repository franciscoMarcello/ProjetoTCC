import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Heading, Text } from "native-base";
import { Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";

type DadosProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type EnderecoProps = {
  id: string;
  street: string;
  city: string;
  complement: string;
  cep: number;
  number: number;
};

import api from "../../service/auth";

import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Termo } from "../../components/Modal";
import { ModalAvaliacao } from "../../components/ModalEndereco";
import Avaliacao from "../Avaliacao";

const User: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [dados, setDados] = useState<DadosProps[]>([]);
  const [Enderecos, setEnderecos] = useState<EnderecoProps[]>([]);
  const [avaliacao, setAvaliacao] = useState("");
  const [picture, setPicture] = useState(null);
  const [imageAvatar, setImageAvatar] = useState("");

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    async function avaliacaoMe() {
      const response = await api.get("/customer/avaliacao", {
        params: {
          customerId: user.id,
        },
      });

      setAvaliacao(response.data.nota);
    }
    avaliacaoMe();
  }, [isFocused]);
  useEffect(() => {
    async function me() {
      const response = await api.get("/customer/me", {
        params: {
          customerId: user.id,
        },
      });

      setDados(response.data);
      setEnderecos(response.data.Endereco);
      setPicture(response.data.picture);
      user.picture = picture!;
    }
    me();
  }, [isFocused, picture]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageAvatar(result.assets[0].uri);
      const formData = new FormData();

      formData.append("picture", {
        uri: imageAvatar,
        name: `Avatar${user.id}`,
        type: "image/jpg",
      });
      formData.append("customerId", user.id);
      console.log(formData);
      await api
        .patch("/customer/updateAvatar", formData)
        .then((response) => {
          Alert.alert("Upload com sucesso", "Imagem enviada");
          setImageAvatar("");
          user.picture = picture!;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box backgroundColor="#1a1c22" flex="1" alignItems="center">
      <StatusBar style="light" />
      <Box alignItems="center">
        <Button variant="ghost" onPress={pickImage}>
          {picture === null ? (
            <Image
              source={
                imageAvatar !== ""
                  ? { uri: imageAvatar }
                  : require("../../assets/images/baixados.png")
              }
              style={{
                width: 150,
                height: 150,
                resizeMode: "cover",
                borderRadius: 75,
              }}
            />
          ) : (
            <Image
              source={{
                uri: `http://192.168.1.15:5000/files/${picture}`,
              }}
              style={{
                width: 150,
                height: 150,
                resizeMode: "cover",
                borderRadius: 75,
              }}
            />
          )}

          <Box alignItems="flex-end">
            <Feather name="edit-2" size={24} color="white" />
          </Box>
        </Button>
      </Box>
      <Box alignItems="center">
        <Heading fontSize="xl" pl="3" pb="1" color="white">
          Nome: {user.name}
        </Heading>
        <Text fontSize="xl" color="white" pl="2">
          Email: {user.email}
        </Text>
        <Text fontSize="xl" color="white" pb="1" pl="2">
          Telefone: {dados.phone}
        </Text>
        {user.tecnicId ? (
          <Box alignItems="center" flexDirection="row">
            <Text fontSize="xl" color="white" pb="1" pl="2" mr="1">
              Você já e técnico
            </Text>
            <MaterialIcons name="verified" size={24} color="#580ef6" />
          </Box>
        ) : (
          <Termo />
        )}
        {user.tecnicId && avaliacao !== null && (
          <Box flexDirection="row" alignItems="center">
            <AntDesign name="star" size={24} color="#daa520" />

            <Text color="white" fontSize="16" ml="1">
              {avaliacao}
            </Text>
          </Box>
        )}
      </Box>
      {Enderecos.length ? (
        Enderecos.map((item) => (
          <Box bg="dark.50" borderRadius={8} width="72" mt={10} key={item.id}>
            <Box flexDirection="row" justifyContent="space-between">
              <Text fontSize="xl" color="white" pb="1" pl="2">
                Rua: {item.street}
              </Text>
              <Box flexDirection="row">
                <ModalAvaliacao
                  id={item.id}
                  streetAtual={item.street}
                  cityAtual={item.city}
                  cepAtual={item.cep}
                  numberAtual={item.number}
                  complementAtual={item.complement}
                />
              </Box>
            </Box>

            <Text fontSize="xl" color="white" pb="1" pl="2">
              Cidade: {item.city}
            </Text>
            <Text fontSize="xl" color="white" pb="1" pl="2">
              CEP: {item.cep}
            </Text>
            <Text fontSize="xl" color="white" pb="1" pl="2">
              Numero: {item.number}
            </Text>
            <Text fontSize="xl" color="white" pb="1" pl="2">
              Complemento: {item.complement}
            </Text>
          </Box>
        ))
      ) : (
        <Box justifyContent="center" alignItems="center" pt="10">
          <Text color="white" fontSize="lg">
            Voce ainda não possui Endereços cadastrados
          </Text>
          <Box pt="2">
            <Button
              bg="#580ef6"
              onPress={() => navigation.navigate("Endereço")}
            >
              <Text color="white" fontSize="md">
                Adicionar Endereços
              </Text>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default User;
