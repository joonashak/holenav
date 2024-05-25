import localforage from "localforage";

const key = "pollSetting";

const setPollSetting = async (pollSetting: boolean) =>
  localforage.setItem(key, pollSetting);
const getPollSetting = async (): Promise<boolean> =>
  !!(await localforage.getItem(key));

export default {
  setPollSetting,
  getPollSetting,
};
