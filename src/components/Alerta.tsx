import {
  Alert,
  Box,
  Center,
  CloseIcon,
  HStack,
  IconButton,
  VStack,
  Text,
} from "native-base";
import React from "react";

interface AlertaProps {
  children: string;
  status: string;
}
export function Alerta({ children }: AlertaProps) {
  return (
    <Center>
      <Alert maxW="400" status="info" colorScheme="info">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                We are going live in July!
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: "coolGray.600",
              }}
            />
          </HStack>
          <Box
            pl="6"
            _text={{
              color: "coolGray.600",
            }}
          >
            {children}
          </Box>
        </VStack>
      </Alert>
    </Center>
  );
}
