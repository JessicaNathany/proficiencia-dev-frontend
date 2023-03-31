import { Box, Button, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Form, FormSelect } from "../components";
import { Header } from "../components/Header";

import levelOptions from "../data/levels";
import languageOptions from "../data/programming_languages";
import skillOptions from "../data/skills";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { QuestionService } from "../services";

interface FormValues {
  skill: string;
  level: string;
  language: string;
}

const skillValidationSchema = yup.object().shape({
  skill: yup.string().required("habilidade obrigatória"),
  level: yup.string().required("nível obrigatório"),
  language: yup.string().required("lingua obrigatória"),
});

export default function Skills() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: yupResolver(skillValidationSchema),
  });

  const onSubmit = methods.handleSubmit(async (values: FormValues) => {
    setIsLoading(true);
    setError("");
    try {
      const { skill, language, level } = values;

      const question = {
        skill,
        level: Number(level),
        language: Number(language),
      };

      await QuestionService.saveQuestion(question);

      router.push("/question");
    } catch (exception: any) {
      setError(
        exception?.response?.data?.message ??
          "Ocorreu um erro ao salvar as preferências"
      );
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
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
            <Form onSubmit={onSubmit}>
              <Box>
                <Flex flexDir="column">
                  <FormSelect
                    name="skill"
                    placeholder="Selecione a habilidade"
                    options={skillOptions}
                  />
                  <FormSelect
                    name="language"
                    placeholder="Selecione a linguagem"
                    options={languageOptions}
                  />
                  <FormSelect
                    name="level"
                    placeholder="Nível"
                    options={levelOptions}
                  />
                </Flex>

                {!!error && (
                  <FormErrorMessage>
                    Ocorreu um erro ao salvar as informações
                  </FormErrorMessage>
                )}

                <Wrap spacing={4}>
                  <WrapItem>
                    <Button
                      type="submit"
                      bg={methods.formState.isValid ? "brand.500" : "gray.300"}
                      p={5}
                      px={20}
                      fontSize="2xl"
                      textColor="white"
                      borderRadius={5}
                      mt="5"
                      disabled={isLoading}
                    >
                      {isLoading ? "processando..." : "Próximo"}
                    </Button>
                  </WrapItem>
                </Wrap>
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
}
