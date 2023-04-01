import StorageService from "./storage-service";

const QUESTION_KEY = "@question";
const FINISH_QUESTION_KEY = "@finish_question";

export interface IAnswer {
  id: number;
  answer: string;
  correct: boolean;
}

export interface IQuestion {
  id: number;
  question: string;
  userAnswer: number | null;
  answers: IAnswer[];
}

export const getQuestions = async (
  profile: any,
  question: any
): Promise<IQuestion[]> => {
  const response = await fetch("/api/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...question,
      ...profile,
    }),
  });

  if (response.status !== 200) {
    throw Error("Error getting questions");
  }

  const data: any = await response.json();

  const output = data?.message?.map((item: any) => ({
    ...item,
    userAnswer: null,
  }));

  return output;
};

export const finishQuestions = async (questions: any) => {
  try {
    const value = JSON.stringify(questions);
    await StorageService.setItem(FINISH_QUESTION_KEY, value);
  } catch (error) {
    throw Error("Error saving question");
  }
};

export const loadFinishQuestions = async () => {
  const questions = await StorageService.getItem(FINISH_QUESTION_KEY);
  const value = JSON.parse(questions);
  return value;
};

export const loadQuestion = async () => {
  const question = await StorageService.getItem(QUESTION_KEY);

  return question;
};

export const saveQuestion = async (question: any) => {
  try {
    StorageService.setItem(QUESTION_KEY, question);
  } catch (error) {
    throw Error("Error saving question");
  }
};

export const clearFinishQuestions = async () => {
  try {
    StorageService.removeItem(FINISH_QUESTION_KEY);
  } catch (error) {
    throw Error("Error clearing question");
  }
};

export const clear = async () => {
  try {
    StorageService.removeItem(QUESTION_KEY);
  } catch (error) {
    throw Error("Error clearing question");
  }
};

export default {
  getQuestions,
  finishQuestions,
  clearFinishQuestions,
  loadFinishQuestions,
  loadQuestion,
  saveQuestion,
  clear,
};
