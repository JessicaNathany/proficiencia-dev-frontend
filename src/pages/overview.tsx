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
            Resultado da Avaliações e Habilidades
          </Text>

          <Text as="h2" fontSize="1xl" mb="10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>

          <Text fontSize="1xl" mb="10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </Text>

          <Text fontSize="1xl" mb="10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
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
          <Image src="/sitting.png" />
        </Box>
      </Box>
    </Box>
  );
}
