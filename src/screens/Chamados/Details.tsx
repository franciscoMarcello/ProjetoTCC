import React, { useState, useEffect } from "react";

import { Button, Box, Text, Heading, Image } from "native-base";
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
    <Box bg="#1a1c22" flex="1">
      <Heading fontSize="2xl" p="4" pb="3" color="white">
        Detalhes do chamado
      </Heading>
      {chamado.map((item) => (
        <Box key={item.id}>
          <Box alignItems="center">
            <Image
              source={{
                uri: item.image,
              }}
              alt={item.title}
              size="64"
              rounded={3}
              resizeMode="cover"
            />
          </Box>
          <Text color="white" fontSize={20}>
            Titulo: {item.title}
          </Text>
          <Text color="white" fontSize={16}>
            Descrição: {item.description}
          </Text>
          <Text color="white" fontSize={16}>
            Status: {item.status}
          </Text>
          <Text color="white" fontSize={16}>
            Tecnico: {item.tecnic}
          </Text>
          <Text color="white" fontSize={16}>
            Categoria: {item.category}
          </Text>
          <Text color="white" fontSize={16}>
            Data:{item.created_at}
          </Text>
          <Text color="white" fontSize={16}>
            Nome:{item.customer.name}
          </Text>
          <Text color="white" fontSize={16}>
            Email:{item.customer.email}
          </Text>
          <Text color="white" fontSize={16}>
            Telefone:{item.customer.phone}
          </Text>
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
          {item.tecnicId === null && user.tecnicId === true && (
            <Box alignItems="center" mt="2">
              <Button bg="#580ef6" onPress={teste} width="64">
                <Text color="white" fontSize={16}>
                  Assumir
                </Text>
              </Button>
            </Box>
          )}
          <Button
            bg="#1a1c22"
            onPress={() =>
              navigation.navigate("Historico", { ChamadoId: item.id })
            }
          >
            fazer comentario
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Details;
