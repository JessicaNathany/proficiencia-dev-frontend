import {
  Avatar,
  Box,
  Button,
  Flex,
  FormErrorMessage,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { Form, FormInput, FormSelect } from "../components";

import languageOptions from "../data/languages";
import levelOptions from "../data/levels";
import { UserService } from "../services";

interface FormValues {
  skill: string;
  level: string;
  language: string;
}

const preferencesValidationSchema = yup.object().shape({
  skill: yup.string().required("função obrigatório"),
  level: yup.string().required("nível obrigatório"),
  language: yup.string().required("lingua obrigatória"),
});

export default function Profile() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: yupResolver(preferencesValidationSchema),
  });

  const onSubmit = methods.handleSubmit(async (values: FormValues) => {
    setIsLoading(true);
    setError("");
    try {
      const { skill, language, level } = values;

      const profile = {
        userSkill: skill,
        userLevel: Number(level),
        userEnglishLevel: Number(language),
      };

      await UserService.saveProfile(profile);

      router.push("/dashboard");
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
      <Box maxWidth={990} margin="0 auto">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          pt="20"
        >
          <Box width="20%">
            <Wrap>
              <WrapItem>
                <Avatar
                  w="150px"
                  h="150px"
                  name={session?.user?.name || ""}
                  src={session?.user?.image || ""}
                />
              </WrapItem>
            </Wrap>
          </Box>
          <Box width="80%">
            <Text as="h1" fontSize="4xl">
              Mais sobre você
            </Text>
            <Text as="h2" fontSize="2xl" mb="10">
              {session?.user?.name} ({session?.user?.email})
            </Text>
            <Form onSubmit={onSubmit}>
              <Box>
                <Flex flexDir="column">
                  <FormInput
                    name="skill"
                    placeholder="Qual é sua função? (ex. Backend Java, Frontend React, etc)"
                  />
                  <FormSelect
                    name="level"
                    placeholder="Qual é seu nível  (Estagiário, junior, Pleno, Senior, etc)"
                    options={levelOptions}
                  />
                  <FormSelect
                    name="language"
                    placeholder="Qual seu nível de inglês (nao falo, iniciante, fluente, etc)"
                    options={languageOptions}
                  />
                </Flex>

                {!!error && (
                  <FormErrorMessage>
                    Ocorreu um erro ao salvar as preferências
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
