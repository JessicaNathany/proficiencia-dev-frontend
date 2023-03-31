import { NextApiRequest, NextApiResponse } from "next";

import languageOptions from "../../data/languages";
import levelOptions from "../../data/levels";
import programmingLanguageOptions from "../../data/programming_languages";
import skillOptions from "../../data/skills";

// eslint-disable-next-line import/no-anonymous-default-export
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

  const userSkillObj = skillOptions.filter((item) => item.value === userSkill);
  const userLevelObj = levelOptions.filter((item) => item.value === userLevel);
  const userLanguageObj = languageOptions.filter(
    (item) => item.value === userEnglishLevel
  );

  const skillLanguageObj = programmingLanguageOptions.filter(
    (item) => item.value === skillLanguage
  );

  const skillLevelObj = levelOptions.filter(
    (item) => item.value === skillLevel
  );

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

  return response.status(200).json(data);
};
