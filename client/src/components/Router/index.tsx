import { BrowserRouter, Route, Switch } from "react-router-dom";
import GetToken from "../../auth/GetToken";
import SystemView from "../SystemView";
import FrontPage from "../FrontPage";
import SettingsView from "../SettingsView";
import AuthenticatedRoute from "../../auth/AuthenticatedRoute";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login/:state" exact component={GetToken} />
      <AuthenticatedRoute path="/system/:systemName" exact>
        <SystemView />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/settings">
        <SettingsView />
      </AuthenticatedRoute>
      <Route path="*" component={FrontPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
