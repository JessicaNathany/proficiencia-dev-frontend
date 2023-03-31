import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Grid,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Header } from "../components/Header";

export default function Dashboard() {
  return (
    <Box w="100%">
      <Header />
      <Box maxWidth={1220} margin="0 auto">
        <Text as="h1" fontSize="4xl">
          Comece aqui
        </Text>
        <Text as="h2" fontSize="1xl" mb="10">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>

        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Card maxW="sm">
            <CardBody>
              <Image src="/skills.png" alt="skills" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Text as="h2" fontSize="2xl">
                  Avaliações e Habilidades
                </Text>
                <Text color="gray.500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </Text>
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button
                  as="a"
                  href="/skills"
                  variant="solid"
                  bg="brand.500"
                  p={3}
                  px={10}
                  fontSize="1xl"
                  textColor="white"
                  borderRadius={5}
                  mt="5"
                >
                  Começar
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image src="/enterview.png" alt="enterview" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Text as="h2" fontSize="2xl">
                  Simulados para processos seletivos
                </Text>
                <Text color="gray.500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </Text>
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button
                  variant="solid"
                  bg="brand.100"
                  p={3}
                  px={10}
                  fontSize="1xl"
                  textColor="white"
                  borderRadius={5}
                  mt="5"
                >
                  Em breve
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image src="/roadmap.png" alt="roadmap" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Text as="h2" fontSize="2xl">
                  Roadmap para seu perfil
                </Text>
                <Text color="gray.500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </Text>
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button
                  disabled
                  variant="solid"
                  bg="brand.100"
                  p={3}
                  px={10}
                  fontSize="1xl"
                  textColor="white"
                  borderRadius={5}
                  mt="5"
                >
                  Em breve
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Grid>
      </Box>
    </Box>
  );
}
