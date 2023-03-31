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

export default function Home() {
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>

        <Wrap spacing={4}>
          <WrapItem>
            <Button
              bg="brand.500"
              p={5}
              textColor="white"
              borderRadius={5}
              mt="5"
            >
              Começar com Google
            </Button>
          </WrapItem>
        </Wrap>
      </Flex>
      <Box flex="1" bgSize="cover" bgImage={"url(/background.png)"} />
    </Flex>
  );
}
