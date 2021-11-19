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

  const logout = async () => {
    await axios.get(endpoints.logout, { headers: { accesstoken: authToken } });
    setAuthToken(null);
  };

  return {
    get token() {
      if (mockUser && devToolsEnabled) {
        return mockUser;
      }
      return authToken;
    },
    get mocking() {
      return mockUser && devToolsEnabled;
    },
    fetchAndSaveToken,
    logout,
  };
};
