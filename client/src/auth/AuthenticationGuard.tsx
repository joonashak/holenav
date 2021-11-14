import { ReactElement } from "react";
import { Redirect } from "react-router-dom";
import useAuth from "./useAuth";

type AuthenticationGuardProps = {
  children: ReactElement;
};

/**
 * Enforce authentication before rendering child components.
 */
export default ({ children }: AuthenticationGuardProps) => {
  const { token } = useAuth();

  if (!token) {
    return <Redirect to="/login" />;
  }

  return children;
};
