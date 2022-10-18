import React, { useState, useEffect } from "react";

import { Input, Button, Box, Select, TextArea, Text } from "native-base";
import api from "../../service/auth";

import { useRoute } from "@react-navigation/native";
type ParamsProps = {
  ChamadoId: string;
};
import { ChamadosProps } from "../User";
const Details: React.FC = () => {
  const route = useRoute();
  const { ChamadoId } = route.params as ParamsProps;
  const [chamado, setChamado] = useState<ChamadosProps[]>([]);
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
      {chamado.map((item) => (
        <Box key={item.id}>
          <Text color="white">{item.title}</Text>
          <Text color="white">{item.description}</Text>
          <Text color="white">{item.status}</Text>
          <Text color="white">{item.tecninc}</Text>
          <Text color="white">{item.category}</Text>
          <Text color="white">{item.created_at}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Details;
