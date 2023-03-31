import {
  Box,
  Button,
  Flex,
  Spinner,
  Stack,
  Text,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FormRadio } from "../components";
import { Header } from "../components/Header";
import { QuestionService, UserService } from "../services";
import { IQuestion } from "../services/question-service";
import { sleep } from "../utils/sleep";

export default function Question() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const [profile, setProfile] = useState<any>(null);
  const [question, setQuestion] = useState<any>(null);

  const router = useRouter();

  const handleChange = async (value: any) => {
    const newQuestions = questions.map((item) => {
      if (item.id === currentQuestion?.id) {
        return {
          ...item,
          userAnswer: value,
        };
      }

      return item;
    });

    await sleep(400);

    setQuestions(newQuestions);
  };

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    onChange: handleChange,
  });

  const handleFinishQuestions = useCallback(async () => {
    try {
      await QuestionService.finishQuestions(questions);
      router.push("/overview");
    } catch (exception) {
      setError(true);
      console.log(
        "Ocorreu um erro ao carregar as informações do usuário.",
        exception
      );
    }
  }, [questions]);

  const loadProfile = useCallback(async () => {
    try {
      const response = await UserService.loadProfile();
      if (!response) {
        router.push("/profile");
        return;
      }
      setProfile(response);
    } catch (exception) {
      router.push("/profile");
    }
  }, []);

  const loadQuestion = useCallback(async () => {
    try {
      const response = await QuestionService.loadQuestion();
      if (!response) {
        router.push("/question");
        return;
      }

      setQuestion(response);
    } catch (exception) {
      router.push("/question");
    }
  }, []);

  const loadUserInfo = useCallback(async () => {
    try {
      if (!!questions.length) {
        return;
      }

      const response = await QuestionService.getQuestions(profile, question);

      setQuestions(response);
    } catch (exception) {
      setError(true);
      console.log(
        "Ocorreu um erro ao carregar as informações do usuário.",
        exception
      );
    } finally {
      setIsLoading(false);
    }
  }, [profile, question]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  useEffect(() => {
    if (!!profile && !!question) {
      loadUserInfo();
    }
  }, [profile, loadUserInfo]);

  if (!!error) {
    return (
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <VStack>
          <Text as="h1" fontSize="4xl">
            Ocorreu um erro ao criar sua avaliação
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
            Voltar ao ínicio
          </Button>
        </VStack>
      </Flex>
    );
  }

  if (!!isLoading) {
    return (
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <VStack>
          <Spinner size="lg" width={100} height={100} />
          <Text as="h1" fontSize="4xl">
            Criando sua avaliação
          </Text>
        </VStack>
      </Flex>
    );
  }

  const endQuestion = questions.filter((item) => !!item.userAnswer);

  if (!!endQuestion.length) {
    handleFinishQuestions();
  }

  const currentQuestion = questions.filter((item) => !item.userAnswer)[0];

  return (
    <Box w="100%">
      <Header />
      <Box maxWidth={1220} margin="0 auto">
        <Box width="100%">
          <Text as="h1" fontSize="1xl" color="gray.200">
            Questão {currentQuestion?.id}
          </Text>

          <Text as="h2" fontSize="4xl" mb="10">
            {currentQuestion?.question}
          </Text>

          <Flex>
            <Stack {...getRootProps()}>
              <VStack>
                {currentQuestion?.answers?.map((option) => {
                  return (
                    <FormRadio
                      key={option.id}
                      label={option.answer}
                      selected={value === option.id}
                      {...getRadioProps({
                        value: option.id,
                      })}
                    />
                  );
                })}
              </VStack>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
