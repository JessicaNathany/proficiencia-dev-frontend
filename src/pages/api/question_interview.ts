import { OpenAIService } from "@/src/services";
import { NextApiRequest, NextApiResponse } from "next";

import jsonlint from "jsonlint";

import languageOptions from "../../data/languages";
import levelOptions from "../../data/levels";
import resultFormat from "../../data/result_format";
import skillJobInterviewOptions from "../../data/job_skills_interview";
import skillOptionsPosition from "../../data/skill_position";

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
      skillPosition,
      skillLevel,
    } = request.body;
  
  
    const userSkillObj = skillJobInterviewOptions.find((item) => item.value === userSkill);
    const userLevelObj = levelOptions.find((item) => item.value === userLevel);
    const userLanguageObj = languageOptions.find(
      (item) => item.value === userEnglishLevel
    );
  
    const skillJobPositionObj = skillJobInterviewOptions.find(
      (item) => item.value === skillPosition
    );

      const skillPositionObj = skillOptionsPosition.find(
        (item) => item.value === skillPosition
    );
  
    const skillLevelObj = levelOptions.find((item) => item.value === skillLevel);
  
    const data = {
      user: {
        nome,
        email,
        skill: userSkillObj,
        level: userLevelObj,
        language: userLanguageObj,
      },
      skill: skillJobPositionObj,
      skillLevel:skillLevelObj
    };
  
    const resultPatten = JSON.stringify(resultFormat);
  
    const prompt = `
    Baseado em um desenvolvedor de nível ${userLevelObj?.label} 
    e que tenha Inglês ${userLanguageObj?.label}, 
    sugira um questionário de múltipla escolha para ajudar a se preparar para um simulado de processo seletivo para o cargo ${skillPositionObj?.label},
    uma big tech, cujo tema seja ${userSkillObj} e retorne um questionário de múltipla escolha com 5 perguntas e 4 respostas cada, 
    retorne tudo em json sem formatação e no padrão : ${resultPatten}  `.replaceAll(
      "\n",
      ""
    );

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
  
        const message = jsonlint.parse(messageWithoutFirstCharacter);
  
        return response.status(200).json({
          ...data,
          prompt,
          parsed: true,
          message,
        });
      } catch (error) {
        console.log(error);
  
        return response
          .status(400)
          .json({ prompt, parsed: false, message: cleanResponse });
      }
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: "Error on OpenAI" });
    }
  };
  