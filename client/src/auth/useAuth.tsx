import axios from "axios";
import useLocalData from "../components/LocalData/useLocalData";
import { devToolsEnabled, endpoints } from "../config";

export default () => {
  const { authToken, mockUser, setAuthToken } = useLocalData();

  const fetchAndSaveToken = async (ssoState: string) => {
    const { data } = await axios.post(endpoints.getToken, {
      state: ssoState,
    });
    await setAuthToken(data.accessToken);
  };

  return {
    get token() {
      if (mockUser && devToolsEnabled) {
        return mockUser;
      }
      return authToken;
    },
    fetchAndSaveToken,
  };
};
