import { useState } from "react";

import { Box, Button, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { Form, FormSelect } from "../components";
import { Header } from "../components/Header";

import languageOptions from "../data/programming_languages";
import skillOptions from "../data/skills";
import { QuestionService } from "../services";


interface FormValues {
    skill: string;
    level: string;
    language: string;
  }
  
  const skillValidationSchema = yup.object().shape({
    skill: yup.string().required("stack obrigatória"),
  });
  
  // continua...