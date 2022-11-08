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
} from "native-base";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../contexts/auth";
import api from "../../service/auth";

type ComentarioProps = {
  comentario: string;
  created_at: string;
  updated_at: string;
  image: string;
  id: string;
  customerId: string;
};
type ParamsProps = {
  ChamadoId: string;
};
import { ChamadosProps } from "./Details";
const Historico: React.FC = () => {
  const route = useRoute();
  const { ChamadoId } = route.params as ParamsProps;
  const [comentarios, setComentarios] = useState<ComentarioProps[]>([]);
  const [comentario, setComentario] = useState("");
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  async function Comentario() {
    await api.post("/chamado/comentario", {
      chamadoId: ChamadoId,
      customerId: user.id,
      comentario: comentario,
    });
    setComentario("");
    alert("deu certo");
    navigation.goBack();
  }
  useEffect(() => {
    async function comentarios() {
      const response = await api.get("/chamado/comentario", {
        params: {
          chamadoId: ChamadoId,
        },
      });
      setComentarios(response.data);
      console.log(response.data);
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
      <TextArea
        size="xl"
        onChangeText={setComentario}
        value={comentario}
        placeholder="Descrição"
        color="gray.300"
        marginBottom="3"
      />
      <Button bg="#580ef6" onPress={Comentario}>
        <Text color="white" fontSize="md">
          Adicionar Comentario
        </Text>
      </Button>
      {comentarios.length ? (
        <FlatList
          data={comentarios}
          renderItem={({ item }) => (
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
                    {item.comentario}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )}
        />
      ) : (
        <Text>Sem comentaruos</Text>
      )}
    </Box>
  );
};

export default Historico;
