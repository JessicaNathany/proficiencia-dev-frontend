import { Box, Button, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { FormSelect } from "../components";
import { Header } from "../components/Header";

const levelOptions = [
  { value: 1, label: "Estagiário" },
  { value: 2, label: "Junior" },
  { value: 3, label: "Pleno" },
  { value: 4, label: "Senior" },
];

const skillOptions = [
  { value: 1, label: "Backend" },
  { value: 2, label: "Frontend" },
  { value: 3, label: "Fullstack" },
  { value: 4, label: "Mobile" },
  { value: 5, label: "Data Science" },
];

const languageOptions = [
  { value: 1, label: "Nodejs", skillOptionsIds: [1,2] },
  { value: 2, label: "C#" , skillOptionsIds: [1] },
  { value: 3, label: "Java", skillOptionsIds: [1]  },
  { value: 4, label: "React", skillOptionsIds: [2]  },
  { value: 4, label: "Swift", skillOptionsIds: [4]  },
  { value: 4, label: "VueJs", skillOptionsIds: [2]  },
  { value: 4, label: "Golang", skillOptionsIds: [1]  },
  { value: 4, label: "Python", skillOptionsIds: [1,2,5]  },
  { value: 4, label: "R", skillOptionsIds: [5]  },
];

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
