import axios from "axios";
import { endpoints } from "../config";

const reset = async () => axios.get(endpoints.dev.reset);
const seed = async () => axios.get(endpoints.dev.seed);

const getMockUsers = async () => axios.get(endpoints.dev.mockUsers);

const devToolsService = { reset, seed, getMockUsers };
export default devToolsService;
