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
  return (
    <Box backgroundColor="#1a1c22" flex="1" alignItems="center">
      <StatusBar style="light" />
      <Box padding="3" alignItems="center">
        <Image
          bg="white"
          source={{
            uri: "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
          }}
          alt="Alternate Text"
          size="48"
          rounded={100}
          resizeMode="cover"
        />
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
          <Text fontSize="xl" color="white" pb="1" pl="2">
            Voce e tecnico
          </Text>
        ) : (
          <Termo />
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
