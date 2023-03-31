import StorageService from "./storage-service";

const PROFILE_KEY = "@profile";

export const loadProfile = async () => {
  const profile = await StorageService.getItem(PROFILE_KEY);

  return profile;
};

export const saveProfile = async (profile: any) => {
  try {
    StorageService.setItem(PROFILE_KEY, profile);
  } catch (error) {
    throw Error("Error saving profile");
  }
};

export const clearProfile = async () => {
  try {
    StorageService.removeItem(PROFILE_KEY);
  } catch (error) {
    throw Error("Error clearing profile");
  }
};

export default {
  loadProfile,
  saveProfile,
  clearProfile,
};
