import { Redirect, Route, RouteProps } from "react-router-dom";
import useAuth from "./useAuth";

type AuthenticatedRouteProps = Omit<RouteProps, "component">;

const AuthenticatedRoute = ({ children, ...props }: AuthenticatedRouteProps) => {
  const { token } = useAuth();

  const AuthenticatedComponent = () => (token ? <>{children}</> : <Redirect to="/login" />);

  return (
    <Route {...props}>
      <AuthenticatedComponent />
    </Route>
  );
};

export default AuthenticatedRoute;
