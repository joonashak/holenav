import { BrowserRouter, Route, Switch } from "react-router-dom";
import GetToken from "../auth/GetToken";
import { AuthenticatedApolloProvider } from "../auth/useAuthenticatedApollo";
import SystemView from "./SystemView";
import AuthenticationGuard from "../auth/AuthenticationGuard";
import UserData from "./UserData";
import DevTools from "../dev/DevTools";
import FrontPage from "./FrontPage";
import { devToolsEnabled } from "../config";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login/:state" exact component={GetToken} />
      <Route path="/system">
        <AuthenticationGuard>
          <AuthenticatedApolloProvider>
            <UserData>
              <Switch>
                <Route path="/system/:systemName" exact component={SystemView} />
              </Switch>
            </UserData>
          </AuthenticatedApolloProvider>
        </AuthenticationGuard>
      </Route>
      <Route path="*" component={FrontPage} />
    </Switch>
    {devToolsEnabled && <DevTools />}
  </BrowserRouter>
);
