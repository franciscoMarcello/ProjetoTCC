import React, { useContext, useEffect, useState } from "react";
import { Button, Box, Text, Heading, Image, ScrollView } from "native-base";
import { Image as ReactImage } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../service/auth";
import { ChamadosProps } from "../Chamados/Details";
import AuthContext from "../../contexts/auth";
type ParamsProps = {
  ChamadoId: string;
};
const Avaliacao: React.FC = () => {
  const route = useRoute();
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const { ChamadoId } = route.params as ParamsProps;
  const [chamado, setChamado] = useState<ChamadosProps[]>([]);
  const [tecnic, setTecnic] = useState("");
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    async function getChamadoId() {
      const response = await api.get("/chamado/details", {
        params: {
          chamadoId: ChamadoId,
        },
      });

      setChamado(response.data);
      setTecnic(response.data[0].tecnicId);
    }
    getChamadoId();
  }, []);
  async function enviarAvaliacao() {
    console.log(defaultRating, ChamadoId, tecnic, user.id);
    await api.post("/customer/avaliacao", {
      nota: defaultRating,
      chamadoId: ChamadoId,
      tecnicId: tecnic,
      customerId: user.id,
    });
    alert("Obrigado por avaliar!");
    navigation.navigate("Dash");
  }
  return (
    <Box bg="#1a1c22" flex="1" alignItems="center" justifyContent="center">
      <Image
        bg="white"
        source={{
          uri: "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
        }}
        alt="Alternate Text"
        size="48"
        rounded={100}
        resizeMode="cover"
      />
      {chamado.map((item) => (
        <Text color="white" fontSize="xl" mt="2" key={item.id}>
          {item.tecnic}
        </Text>
      ))}

      <Box flexDirection="row" mt="2">
        {maxRating.map((item, key) => {
          return (
            <Button
              variant="ghost"
              opacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <ReactImage
                source={
                  item <= defaultRating
                    ? require("../../assets/images/star-outline-filled.png")
                    : require("../../assets/images/3601537-200.png")
                }
                style={{ width: 40, height: 40, resizeMode: "cover" }}
              />
            </Button>
          );
        })}
        <Text></Text>
      </Box>
      <Text color="white">
        {defaultRating} / {Math.max.apply(null, maxRating)}
      </Text>
      <Button bg="#580ef6" onPress={enviarAvaliacao} mt="2">
        Avaliar
      </Button>
    </Box>
  );
};

export default Avaliacao;
