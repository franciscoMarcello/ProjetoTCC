import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { Input, Button, Box, Select, TextArea, Text } from "native-base";
import api from "../../service/auth";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
type ParamsProps = {
  ChamadoId: string;
};
import { ChamadosProps } from "../User";
const Details: React.FC = () => {
  const route = useRoute();
  const { ChamadoId } = route.params as ParamsProps;
  const [chamado, setChamado] = useState<ChamadosProps>([]);
  useEffect(() => {
    async function getChamadoId() {
      const response = await api.get("/chamado/details", {
        params: {
          chamadoId: ChamadoId,
        },
      });
      setChamado(response.data);
      console.log(response.data);
    }
    getChamadoId();
  }, []);
  return (
    <Box>
      <Text color="black">{chamado.title}</Text>
      <Text color="black">{chamado.description}</Text>
      <Text color="black">{chamado.status}</Text>
      <Text color="black">{chamado.tecninc}</Text>
    </Box>
  );
};

export default Details;
