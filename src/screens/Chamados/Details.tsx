import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button, Box, Text, Heading, Image, ScrollView } from "native-base";
import api from "../../service/auth";
import { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
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
import { ModalAvaliacao } from "../../components/ModalAvaliacao";
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
      navigation.navigate("Avaliacao", chamado.id);
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
                w="48"
                resizeMode="cover"
              />
            </Box>
            <Box
              flexDirection="row"
              mt="2"
              alignItems="center"
              borderRadius="8"
              height="8"
              backgroundColor="muted.800"
            >
              <Text color="white" fontSize={20}>
                Titulo: {item.title}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              mt="2"
              alignItems="center"
              borderRadius="8"
              height="auto"
              backgroundColor="muted.800"
            >
              <Text color="white" fontSize={20}>
                Descrição: {item.description}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              mt="2"
              alignItems="center"
              borderRadius="8"
              height="8"
              backgroundColor="muted.800"
            >
              <Text color="white" fontSize={20}>
                Status: {item.status}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              mt="2"
              alignItems="center"
              borderRadius="8"
              height="8"
              backgroundColor="muted.800"
            >
              <Text color="white" fontSize={20}>
                Tecnico: {item.tecnic}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              mt="2"
              alignItems="center"
              borderRadius="8"
              height="8"
              backgroundColor="muted.800"
            >
              <Text color="white" fontSize={20}>
                Categoria: {item.category}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              mt="2"
              alignItems="center"
              borderRadius="8"
              height="8"
              backgroundColor="muted.800"
            >
              <Text color="white" fontSize={18}>
                Data: {item.created_at}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              mt="2"
              alignItems="center"
              borderRadius="8"
              height="8"
              backgroundColor="muted.800"
            >
              <Text color="white" fontSize={18}>
                Nome: {item.customer.name}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              mt="2"
              alignItems="center"
              borderRadius="8"
              height="8"
              backgroundColor="muted.800"
            >
              <Entypo name="email" size={20} color="white" />
              <Text color="white" fontSize={18} ml="2">
                Email: {item.customer.email}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              mt="2"
              alignItems="center"
              borderRadius="8"
              height="8"
              backgroundColor="muted.800"
            >
              <FontAwesome name="whatsapp" size={20} color="white" />
              <Text color="white" fontSize={18} ml="2">
                Telefone: {item.customer.phone}
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
