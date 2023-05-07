import axios from "axios";
import { endpoints } from "../config";

const makeOptions = (devKey = "") => ({
  headers: {
    devkey: devKey,
  },
});

const reset = async (devKey?: string) => axios.get(endpoints.dev.reset, makeOptions(devKey));
const seed = async (devKey?: string) => axios.get(endpoints.dev.seed, makeOptions(devKey));

const getMockUsers = async (devKey?: string) =>
  axios.get(endpoints.dev.mockUsers, makeOptions(devKey));

const devToolsService = { reset, seed, getMockUsers };
export default devToolsService;
