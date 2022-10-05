import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Input, Button, Box, Select } from "native-base";
import api from "../../service/auth";
import { StackParamsList } from "../../routes/auth.routes";
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
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cateegory, setCategory] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text>Novo chamado</Text>
      <Box
        bg={{
          linearGradient: {
            colors: ["lightBlue.300", "violet.800"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        p="12"
        rounded="xl"
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
          placeholder="titulo do chamado"
          color={"white"}
        />
        <Input
          size="xl"
          onChangeText={setDescription}
          value={description}
          placeholder="descrição"
          color={"white"}
        />
        <Select
          selectedValue={cateegory}
          minWidth="300"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            size: 20,
          }}
          mt={1}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
        <Input
          size="xl"
          onChangeText={setCategory}
          value={cateegory}
          placeholder="categoria"
          color={"white"}
        />
      </Box>

      <View>
        <Button onPress={AddChamado}>Adicionar chamado</Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#08090A",
    color: "#ffff",
  },
  text: {
    color: "#fff",
  },
});

export default Chamado;
