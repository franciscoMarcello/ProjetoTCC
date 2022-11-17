import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Box,
  TextArea,
  Button,
  Text,
  FlatList,
  HStack,
  VStack,
  Avatar,
  Heading,
} from "native-base";
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import React, { useContext, useEffect, useState } from "react";
import { formatDate } from "../../utils/FormatDate";
import AuthContext from "../../contexts/auth";
import api from "../../service/auth";

type ComentarioProps = {
  comentario: string;
  created_at: string;
  updated_at: string;
  image: string;
  id: string;
  customerId: string;
  chamado: {
    numeroAprovacao: number;
  };
  customer: {
    picture: string;
    name: string;
  };
};
type ParamsProps = {
  ChamadoId: string;
};

const Historico: React.FC = () => {
  const route = useRoute();
  const { ChamadoId } = route.params as ParamsProps;
  const [comentarios, setComentarios] = useState<ComentarioProps[]>([]);
  const [comentario, setComentario] = useState("");
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  async function Comentario() {
    try {
      await api.post("/chamado/comentario", {
        chamadoId: ChamadoId,
        customerId: user.id,
        comentario: comentario,
      });
      setComentario("");
      alert("Comentario enviado");
      navigation.goBack();
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }
  useEffect(() => {
    async function comentarios() {
      const response = await api.get("/chamado/comentario", {
        params: {
          chamadoId: ChamadoId,
        },
      });
      setComentarios(response.data);
    }
    comentarios();
  }, [isFocused]);
  return (
    <Box
      backgroundColor="#1a1c22"
      alignItems="center"
      justifyContent="center"
      flex="1"
    >
      <Heading fontSize="2xl" p="4" pb="3" color="white">
        Acompanhamento do chamado
      </Heading>

      {comentarios.length ? (
        <FlatList
          data={comentarios}
          renderItem={({ item }) => (
            <Box mt="2" borderColor="gray.700" py="2" size="auto" width="sm">
              {item.customerId === user.id ? (
                <Box flexDirection="row" mt="2">
                  <Box mr="3" alignItems="center">
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      AJ
                    </Avatar>
                    <Text color="white">{item.customer.name}</Text>
                  </Box>

                  <Box
                    bg="#580ef6"
                    borderRadius="8"
                    alignItems="flex-start"
                    width="auto"
                    height="auto"
                    padding="2"
                  >
                    <Text color="white" bold fontSize="xl">
                      {item.comentario}
                    </Text>
                    <Text color="white" fontSize="12">
                      {formatDate(item.created_at)}
                    </Text>
                  </Box>
                </Box>
              ) : (
                <Box flexDirection="row" justifyContent="flex-end" mt="2">
                  <Box
                    bg="gray.400"
                    borderRadius="8"
                    alignItems="flex-end"
                    width="auto"
                    height="auto"
                    padding="2"
                  >
                    <Text color="white" bold fontSize="xl">
                      {item.comentario}
                    </Text>
                    <Text color="white" bold fontSize="12">
                      {formatDate(item.created_at)}
                    </Text>
                  </Box>
                  <Box ml="3" alignItems="center">
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      AJ
                    </Avatar>
                    <Text color="white">{item.customer.name}</Text>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        />
      ) : (
        <>
          <Text>Sem comentarius</Text>
        </>
      )}
      <Box mb="5">
        <TextArea
          size="xl"
          onChangeText={setComentario}
          value={comentario}
          placeholder="Descrição"
          color="gray.300"
          marginBottom="3"
          autoCompleteType="none"
          w="64"
        />
        <Button bg="#580ef6" onPress={Comentario} w="64">
          <Text color="white" fontSize="md">
            Adicionar Comentario
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default Historico;
