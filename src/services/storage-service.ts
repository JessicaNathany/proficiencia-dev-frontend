export const getItem = (key: string) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }
  const output = JSON.parse(value);

  return output;
};

export const setItem = (key: string, value: string) => {
  const output = JSON.stringify(value);
  localStorage.setItem(key, output);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export default {
  getItem,
  setItem,
  removeItem,
};
