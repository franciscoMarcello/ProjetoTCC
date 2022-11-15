import { Button, Center, Checkbox, Modal } from "native-base";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/auth";
import api from "../service/auth";

export function ModalAvaliacao() {
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  return (
    <Center>
      <Button fontSize="sm" mt="2" onPress={() => setShowModal(true)}>
        Avaliar
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "coolGray.800",
        }}
      >
        <Modal.Content maxWidth="350" maxH="312">
          <Modal.CloseButton />
          <Modal.Header>Termo de uso</Modal.Header>
          <Modal.Body>Deseja avaliar o atendimento</Modal.Body>

          <Modal.Footer justifyContent="center">
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Não
              </Button>
              <Button>Sim</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
