import React, { useState, useEffect } from "react";

import {
  Input,
  Button,
  Box,
  Select,
  TextArea,
  Text,
  Heading,
  Image,
} from "native-base";
import api from "../../service/auth";
import { useContext } from "react";
import { useRoute } from "@react-navigation/native";
type ParamsProps = {
  ChamadoId: string;
};
import { ChamadosProps } from "../User";
import AuthContext from "../../contexts/auth";
const Details: React.FC = () => {
  const route = useRoute();
  const { ChamadoId } = route.params as ParamsProps;
  const [chamado, setChamado] = useState<ChamadosProps[]>([]);
  const { user, Logout } = useContext(AuthContext);

  function teste() {
    console.log(user.tecnicId);
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
            Tecnico: {item.tecninc}
          </Text>
          <Text color="white" fontSize={16}>
            Categoria: {item.category}
          </Text>
          <Text color="white" fontSize={16}>
            Data:{item.created_at}
          </Text>
        </Box>
      ))}
      {user.tecnicId && (
        <Button bg="#580ef6" onPress={teste}>
          Assumir
        </Button>
      )}
    </Box>
  );
};

export default Details;
