import { Route, RouteProps } from "react-router-dom";
import AuthenticationGuard from "./AuthenticationGuard";
import { AuthenticatedApolloProvider } from "./useAuthenticatedApollo";
import UserData from "../components/UserData";

/**
 * Wrapper to include authentication components in a react-router-dom `Route` component.
 *
 * Use as you would use `Route`.
 */
const AuthenticatedRouteWrapper = ({ children, ...routeProps }: RouteProps) => (
  <Route {...routeProps}>
    <AuthenticationGuard>
      <AuthenticatedApolloProvider>
        <UserData>{children}</UserData>
      </AuthenticatedApolloProvider>
    </AuthenticationGuard>
  </Route>
);

export default AuthenticatedRouteWrapper;
