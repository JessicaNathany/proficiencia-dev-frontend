import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useRadioGroup,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FormRadio } from "../components";
import { Header } from "../components/Header";

const options = [
  {
    id: 1,
    name: "React.js",
  },
  {
    id: 2,
    name: "Node.js",
  },
  {
    id: 3,
    name: "AngularJS",
  },
  {
    id: 4,
    name: "Vue.js",
  },
];

export default function Question() {
  const toast = useToast();

  const handleChange = (value: any) => {
    console.log(value);
  };

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    onChange: handleChange,
  });

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

          <Text as="h2" fontSize="1xl" mb="10">
            1 - Qual é a plataforma de desenvolvimento baseada em JavaScript que
            permite a construção de aplicações de alta performance para a web e
            para servidores?
          </Text>

          <Flex>
            <Stack {...getRootProps()}>
              <VStack>
                {options.map((option) => {
                  return (
                    <FormRadio
                      key={option.id}
                      label={option.name}
                      selected={value === option.name}
                      {...getRadioProps({ value: option.name })}
                    />
                  );
                })}
              </VStack>
            </Stack>
          </Flex>

          <Wrap spacing={4}>
            <WrapItem>
              <Button
                bg="brand.500"
                p={3}
                px={10}
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
