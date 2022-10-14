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
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import Chamado from "../Chamados";

const User: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [dados, setDados] = useState<DadosProps>([]);
  const [Enderecos, setEnderecos] = useState<EnderecoProps>([]);
  const [Chamados, setChamados] = useState<ChamadosProps>([]);

  const navigation = useNavigation();

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
  }, [Chamados]);

  return (
    <Box backgroundColor="#1a1c22">
      <StatusBar style="dark" />

      <Avatar
        bg="green.500"
        source={{
          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        }}
      >
        AJ
      </Avatar>

      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Text style={styles.text}>{dados.phone}</Text>
      {Enderecos.map((item) => (
        <View key={item.id}>
          <Text style={styles.text}>{item.street}</Text>
          <Text style={styles.text}>{item.city}</Text>
          <Text style={styles.text}>{item.cep}</Text>
          <Text style={styles.text}>{item.complement}</Text>
        </View>
      ))}

      <Button
        backgroundColor="#580ef6"
        onPress={() => navigation.navigate("Endereço")}
      >
        <Text color="white">Adicionar endereço</Text>
      </Button>
      <Heading fontSize="xl" p="4" pb="3" color="white">
        Meus chamados
      </Heading>
      <FlatList
        data={Chamados}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", { ChamadoId: item.id })
            }
          >
            <Box
              borderBottomWidth="3"
              _dark={{
                borderColor: "muted.30",
              }}
              borderColor="muted.800"
              pl={["2", "4"]}
              pr={["0", "2"]}
              py="2"
              size="32"
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
                  >
                    {item.id}
                  </Text>
                  <Text
                    color="white"
                    _dark={{
                      color: "white",
                    }}
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
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
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

export default User;
