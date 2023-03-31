const OPEN_AI_KEY = String(process.env.OPEN_AI_KEY);
const OPEN_AI_ORGANIZATION = String(process.env.OPEN_AI_ORGANIZATION);

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: OPEN_AI_KEY,
  organization: OPEN_AI_ORGANIZATION,
});

export const instance = new OpenAIApi(configuration);

export const OPEN_AI_MODEL = "text-davinci-003";

export const completion = async (prompt: string) => {
  const max_tokens = 4097 - prompt.length;

  const completion = await instance.createCompletion({
    model: OPEN_AI_MODEL,
    max_tokens,
    prompt,
  });

  return completion.data.choices;
};

export default {
  completion,
  OPEN_AI_MODEL,
  instance,
};
