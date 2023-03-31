"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!!session) {
    router.push("/dashboard");
  }

  return (
    <Flex h="100vh" alignItems="stretch">
      <Flex
        maxWidth="600"
        width="100%"
        direction="column"
        placeContent="center"
        p="10"
      >
        <Image src="/logo-white.svg" alt="logo" width={400} height={200} />

        <Text as="h2" fontSize="2xl">
          Não importa onde você esteja em sua carreira como desenvolvedor(a),
          sempre há espaço para crescimento e aprimoramento. Teste e aprimore
          suas habilidades, para se tornar um Dev de sucesso.
        </Text>

        <Wrap spacing={4}>
          <WrapItem>
            <Button
              onClick={() => signIn("github")}
              bg="brand.500"
              p={5}
              textColor="white"
              borderRadius={5}
              mt="5"
            >
              Começar com Github
            </Button>
          </WrapItem>
        </Wrap>
      </Flex>
      <Box flex="1" bgSize="cover" bgImage={"url(/background.png)"} />
    </Flex>
  );
}

Login.isPublic = true;
