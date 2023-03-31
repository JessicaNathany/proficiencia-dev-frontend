import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";

export default function Question() {
  return (
    <Box w="100%">
      <Header />

      <Box
        maxWidth={1220}
        margin="0 auto"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pt="20"
      >
        <Box width="50%">
          <Text as="h1" fontSize="4xl">
            Resultado da avaliações e habilidades
          </Text>

          <Text as="h2" fontSize="1xl" mb="10">
            Utilize o feedback para aperfeiçoar seu conhecimento.
          </Text>

          <Text fontSize="1xl" mb="10">
          Os resultados da avaliação de habilidades podem ser utilizados para identificar áreas que precisam ser aprimoradas e para desenvolver um plano
          de treinamento personalizado. Além disso, os resultados podem ser usados para tomar decisões sobre promoções e aumentos salariais, bem como para 
          identificar funcionários com alto potencial de liderança.
          </Text>

          <Text fontSize="1xl" mb="10">
            Faça uma avaliação a cada três meses, para nivelar seu nível de conhecimento.
          </Text>

          <Button
            as="a"
            href="/dashboard"
            bg="brand.500"
            p={3}
            px={10}
            fontSize="2xl"
            textColor="white"
            borderRadius={5}
            mt="5"
          >
            Ínicio
          </Button>
        </Box>
        <Box width="40%">
          <Image alt="feedback" src="/sitting.png" />
        </Box>
      </Box>
    </Box>
  );
}
