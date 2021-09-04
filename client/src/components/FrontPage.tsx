import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import tokenStore from "../auth/tokenStore";
import { devToolsEnabled } from "../config";
import mockUserStore from "../dev/mockUserStore";
import LoginView from "./LoginView";

export default () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await tokenStore.getToken();
      const mockUser = await mockUserStore.getMockUser();
      const mocking = devToolsEnabled && mockUser && mockUser !== "none";

      if (token || mocking) {
        setRedirect(true);
      }
    })();
  }, []);

  return redirect ? <Redirect to="/system/Jita" /> : <LoginView />;
};
