import { useCallback, useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  HStack,
  Spinner,
  Text,
  useRadioGroup,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { FormRadio } from "../components";
import { Header } from "../components/Header";
import { QuestionService, UserService } from "../services";
import { IQuestion } from "../services/question-service";

export default function Question() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [question, setQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<any>(null);

  const router = useRouter();

  const handleConfirmAnswer = useCallback(async () => {
    const currentAnswer = userAnswer;

    setQuestions((prev) =>
      prev.map((item) => {
        if (item.id === currentQuestion?.id) {
          return {
            ...item,
            userAnswer: currentAnswer,
          };
        }
        return item;
      })
    );

    setUserAnswer(null);

    const endQuestion = questions.filter((item) => item.userAnswer === null);
    if (!endQuestion.length) {
      handleFinishQuestions();
    }
  }, [userAnswer]);

  const handleChange = async (value: any) => {
    setUserAnswer(value);
  };

  const { getRadioProps, getRootProps } = useRadioGroup({
    onChange: handleChange,
  });

  const handleFinishQuestions = useCallback(async () => {
    try {
      await QuestionService.finishQuestions(questions);
      router.push("/overview");
    } catch (exception) {
      setError(true);
    }
  }, [questions]);

  const loadProfile = useCallback(async () => {
    try {
      const response = await UserService.loadProfile();
      setProfile(response);
    } catch (exception) {
      router.push("/profile");
    }
  }, []);

  const loadQuestion = useCallback(async () => {
    try {
      const response = await QuestionService.loadQuestion();
      if (!response) {
        router.push("/skills");
        return;
      }

      setQuestion(response);
    } catch (exception) {
      router.push("/question");
    }
  }, [profile]);

  const loadUserInfo = useCallback(async () => {
    try {
      if (!!questions.length) {
        return;
      }

      const response = await QuestionService.getQuestions(profile, question);
      await QuestionService.clearFinishQuestions();

      setQuestions(response);
    } catch (exception) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [profile, question]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (!profile) {
      return;
    }
    loadQuestion();
  }, [profile, loadQuestion]);

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

          <HStack alignItems="flex-start" justify="flex-start">
            <Button
              as="a"
              href="/dashboard"
              bg="brand.500"
              p={3}
              px={10}
              fontSize="2xl"
              textColor="white"
              borderRadius={5}
            >
              Voltar ao ínicio
            </Button>
            <Button
              as="a"
              href="/question"
              bg="gray.700"
              p={3}
              px={10}
              fontSize="2xl"
              textColor="white"
              borderRadius={5}
            >
              Tentar novamente
            </Button>
          </HStack>
        </VStack>
      </Flex>
    );
  }

  const currentQuestion = questions.filter(
    (item) => item.userAnswer === null
  )[0];

  if (!!questions.length && !currentQuestion) {
    handleFinishQuestions();
  }

  if (!!isLoading || !currentQuestion) {
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

          <VStack {...getRootProps()}>
            <VStack align="flex-start" w="100%">
              {currentQuestion?.answers?.map((option) => {
                return (
                  <FormRadio
                    key={option.id}
                    label={option.answer}
                    selected={Number(userAnswer) === Number(option.id)}
                    {...getRadioProps({
                      value: Number(option.id),
                    })}
                  />
                );
              })}

              <Wrap mt="30">
                <WrapItem>
                  <Button
                    type="submit"
                    bg={!!userAnswer ? "brand.500" : "gray.700"}
                    p={5}
                    px={20}
                    fontSize="2xl"
                    textColor="white"
                    borderRadius={5}
                    onClick={handleConfirmAnswer}
                    mt="5"
                    disabled={!userAnswer}
                    _hover={{
                      cursor: !!userAnswer ? "pointer" : "not-allowed",
                    }}
                  >
                    Próximo
                  </Button>
                </WrapItem>
              </Wrap>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
