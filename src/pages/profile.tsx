import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FormInput, FormSelect } from "../components";

import languageOptions from "../data/languages";
import levelOptions from "../data/levels";

export default function Profile() {
  const { data: session } = useSession();

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
                name={session?.user?.name || ""}
                src={session?.user?.image || ""}
              />
            </WrapItem>
          </Wrap>
        </Box>
        <Box width="80%">
          <Text as="h1" fontSize="4xl">
            Mais sobre você
          </Text>
          <Text as="h2" fontSize="2xl" mb="10">
            {session?.user?.name} ({session?.user?.email})
          </Text>

          <Flex flexDir="column">
            <FormInput placeholder="Qual é sua função? (ex. Backend Java, Frontend React, etc)" />
            <FormSelect
              placeholder="Qual é seu nível  (Estagiário, junior, Pleno, Senior, etc)"
              options={levelOptions}
            />
            <FormSelect
              placeholder="Qual seu nível de inglês (nao falo, iniciante, fluente, etc)"
              options={languageOptions}
            />
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
