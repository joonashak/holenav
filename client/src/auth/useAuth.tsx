import axios from "axios";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import tokenStore from "./tokenStore";

const defaultState = {
  token: null,
  storedToken: null,
  pending: true,
};

const AuthContext = createContext([[], () => {}]);
AuthContext.displayName = "Authentication";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<any>(defaultState);

  useEffect(() => {
    (async () => {
      const storedToken = await tokenStore.getToken();
      // Token from localforage is saved in another field to get around
      // the race condition introduced by <GetToken> fetching a new token
      // at the same time.
      setState({ storedToken, pending: false });
    })();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default () => {
  const [state, setState] = useContext<any>(AuthContext);
  const { token, pending, storedToken } = state;

  const fetchAndSaveToken = async (ssoState: string) => {
    setState({ token: null, pending: true });

    const { data } = await axios.post(
      `${process.env.REACT_APP_CMS_URL}/auth/getToken`,
      { state: ssoState }
    );

    const { accessToken } = data;
    await tokenStore.setToken(accessToken);
    setState({ token: accessToken, pending: false });
  };

  return {
    token: token || storedToken,
    pending,
    fetchAndSaveToken,
  };
};
