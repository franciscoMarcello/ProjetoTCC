import {
  AlertDialog,
  Button,
  Center,
  Checkbox,
  FormControl,
  Input,
  Modal,
  TextArea,
} from "native-base";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/auth";
import api from "../service/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export function ModalAvaliacao({
  id,
  streetAtual,
  cityAtual,
  numberAtual,
  cepAtual,
  complementAtual,
}: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    async function mont() {
      setStreet(streetAtual);
      setCity(cityAtual);
      setNumber(numberAtual);
      setCep(cepAtual);
      setComplemento(complementAtual);
    }
    mont();
  }, [isOpen]);
  async function EditEndereco() {
    try {
      const response = api.patch("/customer/updateEndereco", {
        id: id,
        street: street,
        number: number,
        city: city,
        cep: cep,
        complement: complemento,
      });
      console.log(id);
      setStreet(""), setCity(""), setCep(""), setNumber(""), setComplemento("");
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  }
  const { user } = useContext(AuthContext);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");
  const [complemento, setComplemento] = useState("");
  const navigation = useNavigation();

  return (
    <Center>
      <Button variant="ghost" onPress={() => setIsOpen(true)}>
        <FontAwesome5 name="edit" size={20} color="#2176ff" />
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Alterar Endereço</AlertDialog.Header>
          <AlertDialog.Body>
            <FormControl>
              <FormControl.Label>Rua</FormControl.Label>
              <Input
                onChangeText={setStreet}
                value={street}
                placeholder="Avenida tal"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>CEP</FormControl.Label>
              <Input
                onChangeText={setCep}
                value={cep}
                placeholder="7680000"
                keyboardType="number-pad"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Número</FormControl.Label>
              <Input
                onChangeText={setNumber}
                value={number}
                placeholder="64"
                keyboardType="number-pad"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Complemento</FormControl.Label>
              <TextArea
                size="md"
                onChangeText={setComplemento}
                value={complemento}
                placeholder="Perto do posto"
                color={"black"}
                placeholderTextColor={"gray.500"}
                marginBottom="3"
                autoCompleteType="none"
              />
            </FormControl>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancelar
              </Button>
              <Button colorScheme="info" onPress={EditEndereco}>
                Alterar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
