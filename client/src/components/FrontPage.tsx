import { Redirect } from "react-router-dom";
import useLocalData from "./LocalData/useLocalData";
import LoginView from "./LoginView";

export default () => {
  const { authToken, mockUser } = useLocalData();
  const redirect = authToken || mockUser;

  return redirect ? <Redirect to="/system/Jita" /> : <LoginView />;
};
