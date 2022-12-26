import { Route, RouteProps } from "react-router-dom";
import AuthenticatedComponent from "./AuthenticatedComponent";
import useAuth from "./useAuth";

type AuthenticatedRouteProps = Omit<RouteProps, "component">;

const AuthenticatedRoute = ({ children, ...props }: AuthenticatedRouteProps) => {
  const { token } = useAuth();

  return (
    <Route {...props}>
      <AuthenticatedComponent token={token}>{children}</AuthenticatedComponent>
    </Route>
  );
};

export default AuthenticatedRoute;
