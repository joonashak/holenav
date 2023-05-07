import localforage from "localforage";

const key = "devKey";

const setDevKey = async (devKey: string) => localforage.setItem(key, devKey);
const getDevKey = async (): Promise<string | null> => localforage.getItem(key);

export default {
  setDevKey,
  getDevKey,
};
