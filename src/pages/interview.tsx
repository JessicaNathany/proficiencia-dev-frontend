import { useState } from "react";

import { Box, Button, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { Form, FormSelect } from "../components";
import { Header } from "../components/Header";

import levelOptions from "../data/levels";
import skillJobInterviewOptions from "../data/job_skills_interview";
import skillOptionsPosition from "../data/skill_position";
import languageLevel from "../data/languages";
import { QuestionService } from "../services";

interface FormValues {
    skillPosition: string;
    skillInterview: string;
    language: string;
    level: string;
  }
  
  const skillValidationSchema = yup.object().shape({
    skillPosition: yup.string().required("cargo obrigatório"),
    skillInterview: yup.string().required("habilidade obrigatória"),
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
          const { skillPosition, skillInterview, language, level } = values;
    
          const question = {
            skillPosition,
            skillInterview,
            skillLevel: Number(level),
            skillLanguage: Number(language),
          };
    
          await QuestionService.saveQuestion(question);
    
          router.push("/simulate");
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
             Simulados para processos seletivos
            </Text>
            <Text as="h2" fontSize="1xl" mb="10">
              Prepare-se melhor para um processo seletivo: Esteja preparado!.
            </Text>
            <Form onSubmit={onSubmit}>
              <Box>
                <Flex flexDir="column">
                  <FormSelect
                    name="position"
                    placeholder="Selecione o cargo"
                    options={skillOptionsPosition}
                  />
                  <FormSelect
                    name="skill"
                    placeholder="Selecione a habilidade"
                    options={skillJobInterviewOptions}
                  />
                  <FormSelect
                    name="englishLevel"
                    placeholder="Selecione o nível do seu inglês"
                    options={languageLevel}
                  />
                  <FormSelect
                    name="level"
                    placeholder="Nível"
                    options={levelOptions}
                  />
                </Flex>

                {!!error && (
                  <Text color="red">
                    Ocorreu um erro ao salvar as informações
                  </Text>
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