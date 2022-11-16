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
  StatusBar,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth";

import api from "../../service/auth";
import { formatDate } from "../../utils/FormatDate";
import { ChamadosProps } from "../Chamados/Details";

const Home = () => {
  const [Chamados, setChamados] = useState<ChamadosProps[]>([]);
  const isFocused = useIsFocused();
  const { user } = useContext(AuthContext);
  const [list, setList] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function me() {
      if (list) {
        const response = await api.get("/customer/chamados", {
          params: {
            customerId: user.id,
          },
        });
        setChamados(response.data);
      } else {
        const response = await api.get("/chamados", {
          params: {
            customerId: user.id,
          },
        });
        setChamados(response.data);
      }

      // let dataformat = format(Chamados.created_at, "dd/MM/yy", {
      //   locale: ptBR,
      // });

      // console.log(dataformat);
    }
    me();
  }, [isFocused, list]);
  function me() {
    setList(true);
  }
  function out() {
    setList(false);
  }

  return (
    <Box backgroundColor="#1a1c22" flex="1">
      <StatusBar barStyle="light-content" />
      {user.tecnicId ? (
        <Box flexDirection="row" justifyContent="center" mt="2">
          <Button size="20" mr="2" variant="ghost" onPress={me}>
            <Text fontSize="15" color="white">
              Meus chamados
            </Text>
          </Button>

          <Button size="20" variant="ghost" onPress={out}>
            <Text fontSize="15" color="white">
              Chamados
            </Text>
          </Button>
        </Box>
      ) : null}

      {list ? (
        <Heading fontSize="2xl" p="4" pb="3" color="white">
          Meus chamados
        </Heading>
      ) : (
        <Heading fontSize="2xl" p="4" pb="3" color="white">
          Chamados
        </Heading>
      )}

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
                size="auto"
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
                      isTruncated
                      maxW="100"
                      w="90%"
                    >
                      {item.description}
                    </Text>
                  </VStack>
                  <Spacer />
                  <VStack>
                    <Text
                      fontSize="14"
                      _dark={{
                        color: "white",
                      }}
                      color="white"
                      alignSelf="flex-end"
                    >
                      Status: {item.status}
                    </Text>

                    <Text
                      fontSize="14"
                      _dark={{
                        color: "white",
                      }}
                      color="white"
                      alignSelf="flex-end"
                    >
                      Data: {formatDate(item.created_at)}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Button>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Box justifyContent="center" alignItems="center" pt="20">
          <Text color="white" fontSize="lg">
            Nenhum chamado no momento
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Home;
