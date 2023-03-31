import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FormInput } from "../components";

export default function Profile() {
  return (
    <Box maxWidth={990} margin="0 auto">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pt="20"
      >
        <Box width="20%">
          <Wrap>
            <WrapItem>
              <Avatar
                w="150px"
                h="150px"
                name="Felipe Rosas"
                src="https://github.com/eufelipe.png"
              />
            </WrapItem>
          </Wrap>
        </Box>
        <Box width="80%">
          <Text as="h1" fontSize="4xl">
            Mais sobre você
          </Text>
          <Text as="h2" fontSize="2xl" mb="10">
            Felipe da Silva Rosas (contato@eufelipe.com)
          </Text>

          <Flex flexDir="column">
            <FormInput placeholder="Qual é sua função? (ex. Backend Java, Frontend React, etc)" />
            <FormInput placeholder="Qual é seu nível  (Estagiário, junior, Pleno, Senior, etc)" />
            <FormInput placeholder="Qual seu nível de inglês (nao falo, iniciante, fluente, etc)" />
          </Flex>

          <Wrap spacing={4}>
            <WrapItem>
              <Button
                as="a"
                href="/dashboard"
                bg="brand.500"
                p={5}
                px={20}
                fontSize="2xl"
                textColor="white"
                borderRadius={5}
                mt="5"
              >
                Próximo
              </Button>
            </WrapItem>
          </Wrap>
        </Box>
      </Box>
    </Box>
  );
}
