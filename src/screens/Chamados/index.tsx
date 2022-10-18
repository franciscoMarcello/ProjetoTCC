import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { Input, Button, Box, Select, TextArea, Text } from "native-base";
import api from "../../service/auth";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

const Chamado: React.FC = () => {
  async function AddChamado() {
    try {
      const response = api.post("/chamado", {
        description: description,
        title: title,
        category: cateegory,
        customerId: user.id,
      });
      console.log(description, title, cateegory, user.id);
      setDescription(""), setTitle(""), setCategory("");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  }
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cateegory, setCategory] = useState("");

  return (
    <Box
      backgroundColor="#1a1c22"
      alignItems="center"
      justifyContent="center"
      flex="1"
    >
      <StatusBar style="dark" />
      <Text bold color="white" fontSize="2xl">
        Novo Chamado
      </Text>
      <Box
        bg={{
          linearGradient: {
            colors: ["lightBlue.300", "violet.800"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        rounded="xl"
        p="4"
        _text={{
          fontSize: "md",
          fontWeight: "medium",
          color: "warmGray.50",
          textAlign: "center",
        }}
      >
        <Input
          size="xl"
          onChangeText={setTitle}
          value={title}
          placeholder="Titulo do chamado"
          color="gray.300"
          marginBottom="3"
        />
        <TextArea
          size="xl"
          onChangeText={setDescription}
          value={description}
          placeholder="Descrição"
          color="gray.300"
          marginBottom="3"
        />
        <Select
          marginBottom="3"
          selectedValue={cateegory}
          minWidth="300"
          accessibilityLabel="Selecione a categoria"
          placeholder="Selecione a categoria"
          color="gray.300"
          size="3"
          _selectedItem={{
            bg: "teal.600",
            size: 35,
            width: "100%",
            color: "black",
          }}
          mt={1}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Select.Item label="Sistemas" value="Sistemas" />
          <Select.Item label="Desenvolvimento" value="Desenvolvimento" />
          <Select.Item label="Suporte" value="Suporte" />
          <Select.Item label="Consultoria" value="Consultoria" />
          <Select.Item label="Design" value="Design" />
        </Select>
      </Box>

      <View>
        <Button backgroundColor="#580ef6" onPress={AddChamado}>
          Adicionar chamado
        </Button>
      </View>
    </Box>
  );
};

export default Chamado;
