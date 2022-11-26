import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Box, TextArea, Button, Text, FlatList, Heading } from "native-base";
import { Image } from "react-native";

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
                    <Image
                      source={
                        user.picture === null
                          ? require("../../assets/images/baixados.png")
                          : {
                              uri: `http://192.168.1.18:5000/files/${user.picture}`,
                            }
                      }
                      style={{ width: 60, height: 60, borderRadius: 50 }}
                    />

                    <Text color="white" mt="1">
                      {item.customer.name}
                    </Text>
                  </Box>

                  <Box
                    bg="#580ef6"
                    borderRadius="8"
                    alignItems="flex-start"
                    width="auto"
                    height="auto"
                    p="2"
                  >
                    <Text color="white" fontSize="16">
                      {item.comentario}
                    </Text>

                    <Text color="gray.300" fontSize="12">
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
                    <Text color="white" fontSize="16">
                      {item.comentario}
                    </Text>
                    <Text color="gray.300" fontSize="12">
                      {formatDate(item.created_at)}
                    </Text>
                  </Box>
                  <Box ml="3" alignItems="center">
                    <Image
                      source={require("../../assets/images/baixados.png")}
                      style={{ width: 60, height: 60, borderRadius: 50 }}
                    />

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
