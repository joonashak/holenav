import { ReactChild } from "react";
import { Redirect } from "react-router-dom";
import useAuth from "./useAuth";

type AuthenticationGuardProps = {
  children: ReactChild;
};

/**
 * Enforce authentication before rendering child components.
 */
export default ({ children }: AuthenticationGuardProps) => {
  const { token, pending } = useAuth();

  if (pending) {
    return null;
  }

  if (!token) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};
