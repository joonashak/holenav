import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import tokenStore from "../auth/tokenStore";
import LoginView from "./LoginView";

export default () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await tokenStore.getToken();
      if (token) {
        setRedirect(true);
      }
    })();
  }, []);

  return redirect ? <Redirect to="/system/Jita" /> : <LoginView />;
};
