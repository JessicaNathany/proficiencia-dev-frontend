import { OpenAIService } from "@/src/services";
import { NextApiRequest, NextApiResponse } from "next";

import languageOptions from "../../data/languages";
import levelOptions from "../../data/levels";
import programmingLanguageOptions from "../../data/programming_languages";
import skillOptions from "../../data/skills";
import resultFormat from "../../data/result_format";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method Not Allow" });
  }

  const {
    nome,
    email,
    userSkill,
    userLevel,
    userEnglishLevel,
    skillLanguage,
    skillLevel,
  } = request.body;

  // validar a entrada dos objetos
  const userSkillObj = skillOptions.find((item) => item.value === userSkill);
  const userLevelObj = levelOptions.find((item) => item.value === userLevel);
  const userLanguageObj = languageOptions.find(
    (item) => item.value === userEnglishLevel
  );

  const skillLanguageObj = programmingLanguageOptions.find(
    (item) => item.value === skillLanguage
  );

  const skillLevelObj = levelOptions.find((item) => item.value === skillLevel);

  const data = {
    user: {
      nome,
      email,
      skill: userSkillObj,
      language_level: userLevelObj,
      language: userLanguageObj,
    },
    skill: skillLanguageObj,
    skillLevel: skillLevelObj,
  };

  const resultPatten = JSON.stringify(resultFormat);

  const prompt = `
  Baseado em um usuário ${userSkillObj?.label} de nível ${userLevelObj?.label} 
  e que fala Inglês ${userLanguageObj?.label}, 
  sugira um questionário de múltipla escolha para ajudar a se preparar para uma prova de ${skillLanguageObj?.label},
  retorne um questionário de múltipla escolha com 5 perguntas e 4 respostas cada, 
  retorne tudo em json sem formatação e no padrão : ${resultPatten}  `.replaceAll("\n", "");

  try {
    const result = await OpenAIService.completion(prompt);

    const [resultData] = result;

    if (!resultData) {
      return response
        .status(400)
        .json({ error: "Nenhum resultado encontrado" });
    }

    const text = String(resultData.text);

    const cleanResponse = text
      .trim()
      .replaceAll(/^\ufeff/g, "")
      .replaceAll("\r", "")
      .replaceAll("\t", "")
      .replaceAll("\f", "")
      .replaceAll("\n", "");

    try {
      const messageWithoutFirstCharacter = cleanResponse.replace(
        /^([^{\[]*)/,
        ""
      );

      const message = JSON.parse(messageWithoutFirstCharacter);

      return response.status(200).json({
        ...data,
        prompt,
        parsed: true,
        message,
      });
    } catch (error) {
      console.log(error);
    }

    return response
      .status(200)
      .json({ ...data, prompt, parsed: false, message: cleanResponse });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ error: "Error on OpenAI" });
  }
};
