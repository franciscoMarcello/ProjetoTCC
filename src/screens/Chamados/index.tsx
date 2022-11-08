import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button, Box, Select, TextArea, Image, Heading } from "native-base";
import { Input } from "../../components/input";
import api from "../../service/auth";

import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";

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
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Box
      backgroundColor="#1a1c22"
      alignItems="center"
      justifyContent="center"
      flex="1"
    >
      <StatusBar style="dark" />
      <Heading fontSize="2xl" p="4" pb="3" color="white">
        Novo Chamado
      </Heading>
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
          onChangeText={setTitle}
          value={title}
          placeholder="Titulo do chamado"
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
      <Button mb={3} minWidth="300" onPress={pickImage}>
        Selecione imagem
      </Button>
      {image && <Image source={{ uri: image }} size={250} alt="Teste" mb={3} />}
      <Box>
        <Button backgroundColor="#580ef6" onPress={AddChamado}>
          Adicionar chamado
        </Button>
      </Box>
    </Box>
  );
};

export default Chamado;
