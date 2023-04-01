import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Header } from "../components/Header";
import { QuestionService } from "../services";

export default function Question() {
  const [questions, setQuestions] = useState<any>();
  const [isBeautifully, setIsBeautifully] = useState(true);

  const loadFinishQuestions = useCallback(async () => {
    try {
      const response = await QuestionService.loadFinishQuestions();

      if (response) {
        setQuestions(response);
      }
    } catch (exception) {
      console.log(
        "Ocorreu um erro ao carregar as informações do usuário.",
        exception
      );
    }
  }, []);

  const percentageCorrect = useMemo(() => {
    if (!questions) {
      return 0;
    }
    const totalQuestions = questions.length;
    const correctQuestions = questions.reduce((acc: number, question: any) => {
      const correctAnswer = question.answers.find(
        (answer: any) => answer.correct
      );
      const correctAnswerId = correctAnswer?.id;
      const isUserAnswerCorrect =
        Number(question.userAnswer) === correctAnswerId;
      return isUserAnswerCorrect ? acc + 1 : acc;
    }, 0);
    return (correctQuestions / totalQuestions) * 100;
  }, [questions]);

  useEffect(() => {
    loadFinishQuestions();
  }, [loadFinishQuestions]);

  return (
    <Box w="100%" mb="30">
      <Header />
      {isBeautifully && <ConfettiExplosion duration={3000} />}
      <Box
        maxWidth={1220}
        margin="0 auto"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pt="20"
      >
        <Box width="50%">
          <Text as="h1" fontSize="4xl">
            Resultado da avaliações e habilidades
          </Text>

          <Text as="h2" fontSize="1xl" mb="5">
            Utilize o feedback para aperfeiçoar seu conhecimento.
          </Text>

          <Text fontSize="sm" mb="10">
            Os resultados da avaliação de habilidades podem ser utilizados para
            identificar áreas que precisam ser aprimoradas e para desenvolver um
            plano de treinamento personalizado. Além disso, os resultados podem
            ser usados para tomar decisões sobre promoções e aumentos salariais,
            bem como para identificar funcionários com alto potencial de
            liderança.
          </Text>

          {!!percentageCorrect && (
            <HStack my="5">
              <Text fontSize="8xl">{percentageCorrect}%</Text>

              <Text as="h2" fontSize="1xl">
                {percentageCorrect >= 70
                  ? "Parabéns, você está indo muito bem!"
                  : "Você precisa estudar mais!"}
              </Text>
            </HStack>
          )}

          <Stack>
            {questions?.map((question: any) => {
              const correctAnswer = question.answers.find(
                (answer: any) => answer.correct
              );

              const correctAnswerId = correctAnswer?.id;

              const isUserAnswerCorrect = question.answers.some(
                (answer: any) => {
                  return (
                    answer.id === Number(question.userAnswer) &&
                    answer.id === correctAnswerId
                  );
                }
              );

              return (
                <HStack
                  bg={isUserAnswerCorrect ? "green" : "red"}
                  p="5"
                  flexDir="row"
                  key={question.id}
                >
                  <Box>
                    {isUserAnswerCorrect ? (
                      <CheckIcon mr="5" />
                    ) : (
                      <CloseIcon mr="5" />
                    )}
                  </Box>
                  <Box>
                    <Text fontSize="sm">{question.question}</Text>

                    {!isUserAnswerCorrect && correctAnswer?.answer && (
                      <Text fontSize="small" mt="2">
                        Resposta: {correctAnswer?.answer}
                      </Text>
                    )}
                  </Box>
                </HStack>
              );
            })}
          </Stack>

          <Text fontSize="1xl" mt="10">
            Faça uma avaliação a cada três meses, para nivelar seu nível de
            conhecimento.
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
            voltar ao início
          </Button>
        </Box>
        <Box width="40%">
          <Image alt="feedback" src="/sitting.png" />
        </Box>
      </Box>
    </Box>
  );
}
