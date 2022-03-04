import { Route, RouteProps } from "react-router-dom";
import AuthenticationGuard from "../../../auth/AuthenticationGuard";
import { AuthenticatedApolloProvider } from "../../../auth/useAuthenticatedApollo";
import UserData from "../../UserData";

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
