import { BrowserRouter, Route, Switch } from "react-router-dom";
import GetToken from "../auth/GetToken";
import AuthenticatedApollo from "../auth/AuthenticatedApollo";
import SystemView from "./SystemView";
import AuthenticationGuard from "../auth/AuthenticationGuard";
import LoginView from "./LoginView";
import UserData from "./UserData";
import DevControlPanel from "../dev/DevControlPanel";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={LoginView} />
      <Route path="/login/:state" exact component={GetToken} />
      <Route path="/">
        <AuthenticationGuard>
          <AuthenticatedApollo>
            <UserData>
              <Switch>
                <Route path="/system/:systemName" exact component={SystemView} />
              </Switch>
              <DevControlPanel />
            </UserData>
          </AuthenticatedApollo>
        </AuthenticationGuard>
      </Route>
    </Switch>
  </BrowserRouter>
);
