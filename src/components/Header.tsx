import { Avatar, Box, Button, Flex, Image, Text } from "@chakra-ui/react";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function Header() {
  const { data: session } = useSession();

  return (
    <Flex
      w="100%"
      h="20"
      mx="auto"
      mb="10"
      px="6"
      align="center"
      as="header"
      bg="brand.500"
    >
      <Link href="/" passHref>
        <Box as="a">
          <Image src="/logo-white.svg" alt="logo" height={50} />
        </Box>
      </Link>

      <Flex align="center" ml="auto">
        <Box mr="4" textAlign="right">
          <Text color="white">{session?.user?.name}</Text>
          <Button onClick={() => signOut()}>
            <Text color="white" fontSize="small">
              Sair
            </Text>
          </Button>
        </Box>

        <Avatar
          w="50px"
          h="50px"
          name={session?.user?.name || ""}
          src={session?.user?.image || ""}
        />
      </Flex>
    </Flex>
  );
}
