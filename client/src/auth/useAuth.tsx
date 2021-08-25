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
  pending: true,
};

const AuthContext = createContext([[], () => {}]);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<any>(defaultState);

  useEffect(() => {
    (async () => {
      const token = await tokenStore.getToken();
      setState({ token, pending: false });
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
  const { token, pending } = state;

  const fetchAndSaveToken = async (ssoState: string) => {
    setState({ token: null, pending: true });

    const { data } = await axios.post(
      `${process.env.REACT_APP_CMS_URL}/auth/getToken`,
      { state: ssoState }
    );

    const { accessToken } = data;
    setState({ token: accessToken, pending: false });
    tokenStore.setToken(accessToken);
  };

  return {
    token,
    pending,
    fetchAndSaveToken,
  };
};
