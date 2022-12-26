import { ReactNode } from "react";
import { Redirect } from "react-router-dom";

type AuthenticatedComponentProps = {
  children?: ReactNode;
  token: string | null;
};

const AuthenticatedComponent = ({ children, token }: AuthenticatedComponentProps) =>
  token ? <>{children}</> : <Redirect to="/login" />;

AuthenticatedComponent.defaultProps = {
  children: null,
};

export default AuthenticatedComponent;
