import { Box, Button, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { FormSelect } from "../components";
import { Header } from "../components/Header";

import levelOptions from "../data/levels";
import languageOptions from "../data/programming_languages";
import skillOptions from "../data/skills";

export default function Skills() {
  return (
    <Box w="100%">
      <Header />
      <Box maxWidth={1220} margin="0 auto">
        <Box width="50%">
          <Text as="h1" fontSize="4xl">
            Avaliações e Habilidades
          </Text>
          <Text as="h2" fontSize="1xl" mb="10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>

          <Flex flexDir="column">
            <FormSelect
              placeholder="Selecione a habilidade"
              options={skillOptions}
            />
            <FormSelect
              placeholder="Selecione a linguagem"
              options={languageOptions}
            />
            <FormSelect placeholder="Nível" options={levelOptions} />
          </Flex>

          <Wrap spacing={4}>
            <WrapItem>
              <Button
                as="a"
                href="/question"
                bg="brand.500"
                p={3}
                px={10}
                fontSize="2xl"
                textColor="white"
                borderRadius={5}
                mt="5"
              >
                Começar
              </Button>
            </WrapItem>
          </Wrap>
        </Box>
      </Box>
    </Box>
  );
}
