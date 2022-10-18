import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Spacer,
  VStack,
  Text,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth";
import api from "../../service/auth";
import { ChamadosProps } from "../User";

const Home = () => {
  const [Chamados, setChamados] = useState<ChamadosProps[]>([]);
  const isFocused = useIsFocused();
  const { user } = useContext(AuthContext);

  const navigation = useNavigation();
  useEffect(() => {
    async function me() {
      const response = await api.get("/customer/me", {
        params: {
          customerId: user.id,
        },
      });
      setChamados(response.data.Chamado);

      // let dataformat = format(Chamados.created_at, "dd/MM/yy", {
      //   locale: ptBR,
      // });

      // console.log(dataformat);
    }
    me();
  }, [isFocused]);

  return (
    <Box backgroundColor="#1a1c22" flex="1">
      <Heading fontSize="2xl" p="4" pb="3" color="white">
        Meus chamados
      </Heading>
      {Chamados.length ? (
        <FlatList
          data={Chamados}
          renderItem={({ item }) => (
            <Button
              bg="#1a1c22"
              onPress={() =>
                navigation.navigate("Details", { ChamadoId: item.id })
              }
            >
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
                      {item.title}
                    </Text>
                    <Text
                      color="white"
                      _dark={{
                        color: "white",
                      }}
                      fontSize="md"
                    >
                      {item.description}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "white",
                    }}
                    color="white"
                    alignSelf="flex-start"
                  >
                    {item.created_at}
                  </Text>
                </HStack>
              </Box>
            </Button>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Box justifyContent="center" alignItems="center" pt="20">
          <Text color="white" fontSize="lg">
            Voce ainda não possui chamados
          </Text>
          <Box pt="2">
            <Button
              backgroundColor="#580ef6"
              onPress={() => navigation.navigate("Chamados")}
            >
              <Text color="white" fontSize="md">
                Adicionar chamado
              </Text>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
