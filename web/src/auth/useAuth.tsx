import useLocalData from "../components/local-data/useLocalData";
import { devToolsEnabled } from "../config";

export default () => {
  const { authToken, mockUser } = useLocalData();

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
  };
};
