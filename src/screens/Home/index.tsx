import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getPendingResultAsync } from "expo-image-picker";
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
  Select,
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
  const [status, setStatus] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    async function me() {
      if (user.tecnicId) {
        if (list) {
          const response = await api.get("/tecnic/chamados", {
            params: {
              customerId: user.id,
            },
          });
          if (status === "") {
            setChamados(response.data);
          } else {
            setChamados(
              response.data.filter((item) => {
                if (item.status === status) {
                  return true;
                } else {
                  return false;
                }
              })
            );
          }
        } else {
          const response = await api.get("/chamados", {
            params: {
              customerId: user.id,
            },
          });
          if (status === "") {
            setChamados(response.data);
          } else {
            setChamados(
              response.data.filter((item) => {
                if (item.status === status) {
                  return true;
                } else {
                  return false;
                }
              })
            );
          }
        }
      } else {
        if (list) {
          const response = await api.get("/customer/meusChamados", {
            params: {
              customerId: user.id,
            },
          });

          if (status === "") {
            setChamados(response.data);
          } else {
            setChamados(
              response.data.filter((item) => {
                if (item.status === status) {
                  return true;
                } else {
                  return false;
                }
              })
            );
          }
        } else {
          const response = await api.get("/chamados", {
            params: {
              customerId: user.id,
            },
          });
          if (status === "") {
            setChamados(response.data);
          } else {
            setChamados(
              response.data.filter((item) => {
                if (item.status === status) {
                  return true;
                } else {
                  return false;
                }
              })
            );
          }
        }
      }
    }
    me();
  }, [isFocused, list, status]);
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
      <Box w="auto" alignItems="flex-end">
        <Select
          marginBottom="3"
          selectedValue={status}
          minWidth="230"
          accessibilityLabel="Selecione a categoria"
          placeholder="Selecione status"
          color="gray.300"
          placeholderTextColor="gray.500"
          fontSize="14"
          mr={1}
          _selectedItem={{
            bg: "teal.600",
            width: "100%",
            color: "white",
          }}
          mt={1}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Select.Item label="Aberto" value="Aberto" />
          <Select.Item label="Em atendimento" value="Em atendimento" />
          <Select.Item
            label="Pendente de validação"
            value="Pendente de validação"
          />
          <Select.Item label="Solucionado" value="Solucionado" />
        </Select>
      </Box>

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
                <HStack space={[2, 3]} justifyContent="center">
                  <VStack>
                    <Text
                      _dark={{
                        color: "white",
                      }}
                      color="white"
                      bold
                      fontSize="xl"
                      isTruncated
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
                    >
                      {item.description}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
                <VStack
                  mt="2"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Text
                    fontSize="14"
                    _dark={{
                      color: "white",
                    }}
                    color="white"
                    alignSelf="flex-start"
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
