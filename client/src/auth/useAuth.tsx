import axios from "axios";
import useLocalData from "../components/LocalData/useLocalData";
import { endpoints } from "../config";

export default () => {
  const { authToken, setAuthToken } = useLocalData();

  const fetchAndSaveToken = async (ssoState: string) => {
    const { data } = await axios.post(endpoints.getToken, {
      state: ssoState,
    });
    await setAuthToken(data.accessToken);
  };

  return {
    token: authToken,
    fetchAndSaveToken,
  };
};
