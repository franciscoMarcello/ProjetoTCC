import React, { useContext } from "react";

import { Text, Box, Image, Heading, Button } from "native-base";
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
          <Image
            alt={user.name}
            source={{
              uri: "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
            }}
            size="32"
            rounded={100}
            resizeMode="cover"
          />
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
