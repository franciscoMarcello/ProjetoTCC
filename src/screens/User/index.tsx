import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Heading, Text, Image } from "native-base";
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
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Termo } from "../../components/Modal";

const User: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [dados, setDados] = useState<DadosProps[]>([]);
  const [Enderecos, setEnderecos] = useState<EnderecoProps[]>([]);

  const [picture, setPicture] = useState(user.picture || null);
  const URL = "https://192.168.100.178:5000/customer/updateAvatar";
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    async function me() {
      const response = await api.get("/customer/me", {
        params: {
          customerId: user.id,
        },
      });

      setDados(response.data);
      setEnderecos(response.data.Endereco);

      // let dataformat = format(Chamados.created_at, "dd/MM/yy", {
      //   locale: ptBR,
      // });

      // console.log(dataformat);
    }
    me();
  }, [isFocused]);
  async function delEndereco(id: string) {
    console.log(id);
    try {
      const response = await api.delete("/customer/deleteEndereco", {
        params: {
          id: id,
        },
      });
      alert(response.data.message);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPicture(result.assets[0].uri);
      const formData = new FormData();
      formData.append("picture", {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
      formData.append("customerId", user.id);
      let res = await fetch(URL, {
        method: "patch",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("image uploaded");
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
          <Image
            bg="white"
            source={{
              uri: picture,
            }}
            alt="Alternate Text"
            size="48"
            rounded={100}
            resizeMode="cover"
          />
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
        {user.tecnicId && (
          <Box flexDirection="row" alignItems="center">
            <AntDesign name="star" size={24} color="#daa520" />

            <Text color="white" fontSize="16" ml="1">
              4,2
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
                <Button variant="ghost" onPress={() => delEndereco(item.id)}>
                  <FontAwesome5 name="trash" size={20} color="#9f1239" />
                </Button>
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
