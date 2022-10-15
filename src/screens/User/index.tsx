import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "native-base";

import ptBR from "date-fns/locale/pt-BR";
import format from "date-fns/format";

type DadosProps = {
  id: string;
  name: string;
  email: string;
  phone: number;
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
  map(arg0: (item: any) => JSX.Element): React.ReactNode;

  id: string;
  street: string;
  city: string;
  complement: string;
  cep: number;
};

import { Avatar } from "native-base";
import api from "../../service/auth";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const User: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [dados, setDados] = useState<DadosProps[]>([]);
  const [Enderecos, setEnderecos] = useState<EnderecoProps[]>([]);
  const [Chamados, setChamados] = useState<ChamadosProps[]>([]);
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
      setDados(response.data);
      setEnderecos(response.data.Endereco);
      setChamados(response.data.Chamado);

      // let dataformat = format(Chamados.created_at, "dd/MM/yy", {
      //   locale: ptBR,
      // });

      // console.log(dataformat);
    }
    me();
  }, [isFocused]);

  return (
    <Box backgroundColor="#1a1c22" flex="1">
      <StatusBar style="dark" />
      <Box padding="3" alignItems="center">
        <Avatar
          padding="20"
          source={{
            uri: picture,
          }}
        >
          AJ
        </Avatar>
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
      {Enderecos.map((item) => (
        <Box key={item.id}>
          <Text>{item.street}</Text>
          <Text>{item.city}</Text>
          <Text>{item.cep}</Text>
          <Text>{item.complement}</Text>
        </Box>
      ))}
      <Box alignItems="center">
        <Button
          backgroundColor="#580ef6"
          onPress={() => navigation.navigate("Endereço")}
        >
          <Text color="white" fontSize="md">
            Adicionar endereço
          </Text>
        </Button>
      </Box>
      <Heading fontSize="xl" p="4" pb="3" color="white">
        Meus chamados
      </Heading>
      {Chamados.length ? (
        <FlatList
          data={Chamados}
          renderItem={({ item }) => (
            <Button
              bg="#1a1c22"
              onPress={() =>
                navigation.navigate("Details", { ChamadoId: item.id })
              }
            >
              <Box
                bg="#1a1c22"
                borderBottomWidth="3"
                _dark={{
                  borderColor: "gray.700",
                }}
                borderColor="gray.700"
                pl={["2", "4"]}
                pr={["0", "2"]}
                py="2"
                size="20"
                width="sm"
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <VStack>
                    <Text
                      _dark={{
                        color: "white",
                      }}
                      color="white"
                      bold
                      fontSize="xl"
                    >
                      {item.title}
                    </Text>
                    <Text
                      color="white"
                      _dark={{
                        color: "white",
                      }}
                      fontSize="md"
                    >
                      {item.description}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "white",
                    }}
                    color="white"
                    alignSelf="flex-start"
                  >
                    {item.created_at}
                  </Text>
                </HStack>
              </Box>
            </Button>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Box justifyContent="center" alignItems="center" pt="20">
          <Text color="white" fontSize="lg">
            Voce ainda não possui chamados
          </Text>
          <Box pt="2">
            <Button
              backgroundColor="#580ef6"
              onPress={() => navigation.navigate("Chamados")}
            >
              <Text color="white" fontSize="md">
                Adicionar chamado
              </Text>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default User;
