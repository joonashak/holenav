import localforage from "localforage";

const key = "authToken";

const setToken = async (token: string) => localforage.setItem(key, token);
const getToken = async (): Promise<string | null> => localforage.getItem(key);

export default {
  setToken,
  getToken,
};
