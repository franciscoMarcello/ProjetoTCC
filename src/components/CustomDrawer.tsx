import React, { useContext } from "react";

import { Text, Box, Heading, Button } from "native-base";
import { Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AuthContext from "../contexts/auth";
import { Entypo } from "@expo/vector-icons";

const components: React.FC = (props) => {
  const { user, Logout } = useContext(AuthContext);

  return (
    <Box flex="1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#00000" }}
      >
        <Box alignItems="center">
          {user.picture === null ? (
            <Image
              source={require("../assets/images/baixados.png")}
              style={{
                width: 150,
                height: 150,
                resizeMode: "cover",
                borderRadius: 75,
              }}
            />
          ) : (
            <Image
              source={{
                uri: `http://192.168.1.15:5000/files/${user.picture}`,
              }}
              style={{
                width: 150,
                height: 150,
                resizeMode: "cover",
                borderRadius: 75,
              }}
            />
          )}
        </Box>
        <Heading fontSize="2xl" pl="3" pt="2" mb="8" color="white">
          {user.name}
        </Heading>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Box>
        <Button
          onPress={() => {
            Logout();
          }}
          bg="#da2c38"
          alignItems="center"
          leftIcon={<Entypo name="log-out" size={24} color="white" />}
        >
          <Text fontSize="md" pl="3" pt="2" pb="3" color="white">
            Sair
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default components;
