import { ReactChild, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { devToolsEnabled } from "../config";
import mockUserStore from "../dev/mockUserStore";
import useAuth from "./useAuth";

type AuthenticationGuardProps = {
  children: ReactChild;
};

/**
 * Enforce authentication before rendering child components.
 */
export default ({ children }: AuthenticationGuardProps) => {
  const { token, pending } = useAuth();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const mockUser = await mockUserStore.getMockUser();
      const mocking = devToolsEnabled && mockUser && mockUser !== "none";

      if (!token && !pending && !mocking) {
        setRedirect(true);
      }
    })();
  }, [token, pending]);

  if (pending) {
    return null;
  }

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};
