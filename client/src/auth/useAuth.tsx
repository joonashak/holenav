import axios from "axios";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import tokenStore from "./tokenStore";

const AuthContext = createContext([[], () => {}]);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const token = await tokenStore.getToken();
      setState(token);
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
  const [token, setToken] = useContext<any>(AuthContext);

  const fetchAndSaveToken = async (state: string) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_CMS_URL}/auth/getToken`,
      { state }
    );

    const { accessToken } = data;
    setToken(accessToken);
    tokenStore.setToken(accessToken);
  };

  return {
    token,
    fetchAndSaveToken,
  };
};
