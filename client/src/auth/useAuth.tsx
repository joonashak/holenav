import axios from "axios";
import useLocalData from "../components/LocalData/useLocalData";
import { devToolsEnabled, endpoints } from "../config";

export default () => {
  const { authToken, mockUser, setAuthToken } = useLocalData();

  const logout = async () => {
    await axios.get(endpoints.logout, { headers: { accesstoken: authToken || "" } });
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
    logout,
  };
};
