import localforage from "localforage";

const key = "activeCharacter";

const setActiveCharacter = async (esiId: string) => localforage.setItem(key, esiId);
const getActiveCharacter = async (): Promise<string | null> => localforage.getItem(key);

export default {
  setActiveCharacter,
  getActiveCharacter,
};
