import localforage from "localforage";

const key = "mockUser";

const setMockUser = async (mockUser: string) => localforage.setItem(key, mockUser);
const getMockUser = async (): Promise<string | null> => localforage.getItem(key);

export default {
  setMockUser,
  getMockUser,
};
