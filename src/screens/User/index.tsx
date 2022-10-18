import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Heading, Text, Image } from "native-base";

import ptBR from "date-fns/locale/pt-BR";
import format from "date-fns/format";

type DadosProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
};
export type ChamadosProps = {
  id: string;
  title: string;
  description: string;
  status: string;
  tecninc: string;
  category: string;
  created_at: Date;
  updated_at: Date;
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

const User: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [dados, setDados] = useState<DadosProps[]>([]);
  const [Enderecos, setEnderecos] = useState<EnderecoProps[]>([]);

  const [picture, setPicture] = useState(user.picture);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    async function me() {
      const response = await api.get("/customer/me", {
        params: {
          customerId: user.id,
        },
      });
      console.log(user.picture);
      setDados(response.data);
      setEnderecos(response.data.Endereco);

      // let dataformat = format(Chamados.created_at, "dd/MM/yy", {
      //   locale: ptBR,
      // });

      // console.log(dataformat);
    }
    me();
  }, [isFocused]);

  async function tecnico() {
    const response = await api.patch("/customer/update", {
      customerId: user.id,
    });
    alert(response.data.message);
    console.log(response.data.message);
  }

  return (
    <Box backgroundColor="#1a1c22" flex="1">
      <StatusBar style="light" />
      <Box padding="3" alignItems="center">
        <Image
          borderRadius={100}
          source={{
            uri: user.picture,
          }}
          alt="Alternate Text"
          size="xl"
        />
      </Box>
      <Box alignItems="center">
        <Heading fontSize="xl" pl="3" pb="1" color="white">
          {user.name}
        </Heading>
        <Text fontSize="xl" color="white" pl="2">
          {user.email}
        </Text>
        <Text fontSize="xl" color="white" pb="1" pl="2">
          {dados.phone}
        </Text>
      </Box>
      {Enderecos.length ? (
        Enderecos.map((item) => (
          <Box key={item.id}>
            <Text fontSize="xl" color="white" pb="1" pl="2">
              {item.street}
            </Text>
            <Text fontSize="xl" color="white" pb="1" pl="2">
              {item.city}
            </Text>
            <Text fontSize="xl" color="white" pb="1" pl="2">
              {item.cep}
            </Text>
            <Text fontSize="xl" color="white" pb="1" pl="2">
              {item.complement}
            </Text>
            <Text fontSize="xl" color="white" pb="1" pl="2">
              {item.number}
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
          {user.tecnic ? (
            <Button onPress={tecnico} mt="2">
              <Text color="white" fontSize="md">
                se tornar tecnico?
              </Text>
            </Button>
          ) : null}
        </Box>
      )}
    </Box>
  );
};

export default User;
