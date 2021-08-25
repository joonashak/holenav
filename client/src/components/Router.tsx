import { BrowserRouter, Route, Switch } from "react-router-dom";
import GetToken from "../auth/GetToken";
import AuthenticatedApollo from "../auth/AuthenticatedApollo";
import LoginView from "./LoginView";
import SystemView from "./SystemView";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login/:state" exact component={GetToken} />
      <Route path="/">
        <AuthenticatedApollo>
          <Switch>
            <Route path="/system/:systemName" exact component={SystemView} />
          </Switch>
        </AuthenticatedApollo>
      </Route>
    </Switch>
  </BrowserRouter>
);
