import { BrowserRouter, Route, Switch } from "react-router-dom";
import GetToken from "../auth/GetToken";
import AuthenticatedApollo from "../auth/AuthenticatedApollo";
import SystemView from "./SystemView";
import AuthenticationGuard from "../auth/AuthenticationGuard";
import LoginView from "./LoginView";
import UserData from "./UserData";
import DevTools from "../dev/DevTools";
import FrontPage from "./FrontPage";

const enableDevTools = process.env.REACT_APP_ENABLE_DEVTOOLS === "true";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={FrontPage} />
      <Route path="/login" exact component={LoginView} />
      <Route path="/login/:state" exact component={GetToken} />
      <Route path="/">
        <AuthenticationGuard>
          <AuthenticatedApollo>
            <UserData>
              <Switch>
                <Route path="/system/:systemName" exact component={SystemView} />
              </Switch>
            </UserData>
          </AuthenticatedApollo>
        </AuthenticationGuard>
      </Route>
    </Switch>
    {enableDevTools && <DevTools />}
  </BrowserRouter>
);
