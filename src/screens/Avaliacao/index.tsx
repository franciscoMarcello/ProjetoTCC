import React, { useState } from "react";
import { Button, Box, Text, Heading, Image, ScrollView } from "native-base";

const Avaliacao: React.FC = () => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
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
      <Box flexDirection="row" mt="2">
        {maxRating.map((item, key) => {
          return (
            <Box flexDirection="row">
              <Button
                variant="ghost"
                key={item}
                onPress={() => setDefaultRating(item)}
              >
                <Image
                  source={
                    item <= defaultRating
                      ? require("../../assets/images/star-outline-filled.png")
                      : require("../../assets/images/3601537-200.png")
                  }
                  w="10"
                  h="10"
                  alt="estrela"
                />
              </Button>
            </Box>
          );
        })}
        <Button>Avaliar</Button>
      </Box>
    </Box>
  );
};

export default Avaliacao;
