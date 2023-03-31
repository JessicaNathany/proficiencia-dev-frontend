import StorageService from "./storage-service";

const QUESTION_KEY = "@question";

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

export const clearQuestion = async () => {
  try {
    StorageService.removeItem(QUESTION_KEY);
  } catch (error) {
    throw Error("Error clearing question");
  }
};

export default {
  loadQuestion,
  saveQuestion,
  clearQuestion,
};
