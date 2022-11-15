import React, { useState, useEffect } from "react";

import {
  Button,
  Box,
  Text,
  Heading,
  Image,
  ScrollView,
  StatusBar,
  Divider,
} from "native-base";
import api from "../../service/auth";
import { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

export type ChamadosProps = {
  id: string;
  title: string;
  description: string;
  status: string;
  tecnicId: string;
  category: string;
  created_at: Date;
  updated_at: Date;
  image: string;
  tecnic: string;
  customerId: string;
  numeroAprovacao: number;
  numeroReprovacao: number;
  customer: {
    name: string;
    phone: string;
    email: string;
    Endereco: {
      id: string;
      street: string;
      city: string;
      complement: string;
      cep: number;
      number: number;
    };
  };
};
type ParamsProps = {
  ChamadoId: string;
};

import AuthContext from "../../contexts/auth";

const Details: React.FC = () => {
  const route = useRoute();
  const { ChamadoId } = route.params as ParamsProps;
  const navigation = useNavigation();
  const [chamado, setChamado] = useState<ChamadosProps[]>([]);
  const { user, Logout } = useContext(AuthContext);
  const [data, setDataformatada] = useState("");

  async function teste() {
    try {
      const response = await api.patch("/chamado", {
        customerId: user.id,
        chamadoId: ChamadoId,
      });

      alert("Voce assumiu esse chamado");
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }
  async function Aprovar() {
    try {
      const response = await api.patch("/chamado/aprovar", {
        customerId: user.id,
        chamadoId: ChamadoId,
      });
      alert("Solução aprovada!");

      navigation.navigate("Avaliacao", { ChamadoId: ChamadoId });
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }
  async function Recusar() {
    try {
      const response = await api.patch("/chamado/recusar", {
        customerId: user.id,
        chamadoId: ChamadoId,
      });
      alert("Solução recusada!");
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }
  async function Fechar() {
    try {
      const response = await api.patch("/chamado/fechar", {
        customerId: user.id,
        chamadoId: ChamadoId,
      });
      alert("Voce enviou a solução");
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }
  useEffect(() => {
    async function getChamadoId() {
      const response = await api.get("/chamado/details", {
        params: {
          chamadoId: ChamadoId,
        },
      });

      setChamado(response.data);
    }
    getChamadoId();
  }, []);
  return (
    <ScrollView w="auto" h="80" bg="#1a1c22">
      <StatusBar barStyle="light-content" />
      <Box bg="#1a1c22" flex="1">
        <Heading fontSize="2xl" p="4" pb="3" color="white">
          Detalhes do chamado
        </Heading>
        {chamado.map((item) => (
          <Box key={item.id}>
            <Box alignItems="center">
              <Image
                bg="white"
                source={{
                  uri: "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
                }}
                alt="Alternate Text"
                size="48"
                w="64"
                resizeMode="cover"
                rounded="4"
              />
            </Box>
            <Heading fontSize="xl" pl="2" pt="3" pb="3" color="white">
              Informações do Chamado
            </Heading>
            <Box
              mt="2"
              pl="2"
              borderRadius="5"
              height="auto"
              backgroundColor="muted.800"
              mb="1"
            >
              <Text color="white" fontSize={20}>
                Titulo: {item.title}
              </Text>

              <Text color="white" fontSize={20}>
                Descrição: {item.description}
              </Text>

              <Text color="white" fontSize={20}>
                Status: {item.status}
              </Text>

              <Text color="white" fontSize={20}>
                Tecnico: {item.tecnic}
              </Text>
              <Text color="white" fontSize={20}>
                Categoria: {item.category}
              </Text>
            </Box>
            <Divider my="3" thickness="2" bg="#580ef6" />
            <Heading fontSize="xl" pl="2" pt="2" pb="3" color="white">
              Informações do parceiro
            </Heading>
            <Box
              mt="2"
              borderRadius="5"
              height="auto"
              pl="2"
              backgroundColor="muted.800"
              mb="1"
            >
              <Text color="white" fontSize={20}>
                Nome: {item.customer.name}
              </Text>

              <Text color="white" fontSize={20}>
                Email: {item.customer.email}
              </Text>

              <Text color="white" fontSize={20}>
                Telefone: {item.customer.phone}
              </Text>
            </Box>
            <Divider my="3" thickness="2" bg="#580ef6" />
            <Heading fontSize="xl" pl="2" pt="3" pb="3" color="white">
              Endereço do parceiro
            </Heading>
            <Box
              mt="2"
              borderRadius="5"
              height="auto"
              pl="2"
              backgroundColor="muted.800"
              mb="5"
            >
              <Text color="white" fontSize={20}>
                Cidade: {item.customer.Endereco[0].city}
              </Text>

              <Text color="white" fontSize={20}>
                Rua: {item.customer.Endereco[0].street}
              </Text>

              <Text color="white" fontSize={20}>
                Número: {item.customer.Endereco[0].number}
              </Text>
              <Text color="white" fontSize={20}>
                CEP: {item.customer.Endereco[0].cep}
              </Text>

              <Text color="white" fontSize={20}>
                Complemento: {item.customer.Endereco[0].complement}
              </Text>
            </Box>
            {user.id === item.customerId &&
              item.status === "Pendente de validação" && (
                <Box flexDirection="row" justifyContent="center">
                  <Box mt="2">
                    <Button bg="#32965d" onPress={Aprovar} width="32" mr="3">
                      <Text color="white" fontSize={16}>
                        Aprovar
                      </Text>
                    </Button>
                  </Box>
                  <Box mt="2">
                    <Button bg="#da2c38" onPress={Recusar} width="32">
                      <Text color="white" fontSize={16}>
                        Recusar
                      </Text>
                    </Button>
                  </Box>
                </Box>
              )}
            {user.id === item.tecnicId && item.status === "Em atendimento" && (
              <Box flexDirection="row" justifyContent="center">
                <Box mt="2">
                  <Button bg="#32965d" onPress={Fechar} width="32" mr="3">
                    <Text color="white" fontSize={16}>
                      Enviar solução
                    </Text>
                  </Button>
                </Box>
              </Box>
            )}
            {item.tecnicId === null &&
              user.tecnicId === true &&
              user.id !== item.customerId && (
                <Box alignItems="center" mt="2" mb="3">
                  <Button bg="#580ef6" onPress={teste} width="64">
                    <Text color="white" fontSize={16}>
                      Assumir
                    </Text>
                  </Button>
                </Box>
              )}
            {item.status !== "Aberto" && (
              <Box alignItems="center">
                <Button
                  mb="5"
                  mt="3"
                  w="48"
                  onPress={() =>
                    navigation.navigate("Historico", { ChamadoId: item.id })
                  }
                >
                  Fazer comentario
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </ScrollView>
  );
};

export default Details;
