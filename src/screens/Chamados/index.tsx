import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Button,
  Box,
  Select,
  TextArea,
  Image,
  Heading,
  Alert,
  StatusBar,
} from "native-base";
import { Input } from "../../components/input";
import api from "../../service/auth";
import { AntDesign } from "@expo/vector-icons";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { Alerta } from "../../components/Alerta";

const Chamado: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cateegory, setCategory] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigation = useNavigation();

  async function AddChamado() {
    try {
      // const data = new FormData();
      // data.append("title", title);
      // data.append("description", description);
      // data.append("image", imageAvatar);
      // data.append("category", cateegory);
      // data.append("customerId", user.id);
      const response = await api.post("/chamado", {
        title: title,
        description: description,
        category: cateegory,
        customerId: user.id,
      });

      setDescription(""), setTitle(""), setCategory(""), setAvatarUrl("");

      navigation.goBack();
    } catch (err: any) {
      setError(err.response.data.message);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
      setImageAvatar(result.assets[0].uri);
    }
  };

  return (
    <Box
      backgroundColor="#1a1c22"
      alignItems="center"
      justifyContent="center"
      flex="1"
    >
      <StatusBar barStyle="light-content" />
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
          autoCompleteType="none"
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

      {avatarUrl ? (
        <Box>
          <Box mb="2" alignItems="flex-end">
            <Button variant="ghost" onPress={() => setAvatarUrl("")}>
              <AntDesign name="closecircleo" size={24} color="white" />
            </Button>
          </Box>
          <Image source={{ uri: avatarUrl }} size={250} alt="Teste" mb={3} />
        </Box>
      ) : (
        <Button mb={3} minWidth="300" onPress={pickImage}>
          Selecione imagem
        </Button>
      )}
      <Box>
        <Button backgroundColor="#580ef6" onPress={AddChamado}>
          Adicionar chamado
        </Button>
      </Box>
    </Box>
  );
};

export default Chamado;
