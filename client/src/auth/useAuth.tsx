import axios from "axios";
import { createContext, useState, ReactNode, useContext } from "react";

const AuthContext = createContext([[], () => {}]);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<any>(null);

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
    setToken(data.accessToken);
  };

  return {
    token,
    fetchAndSaveToken,
  };
};
