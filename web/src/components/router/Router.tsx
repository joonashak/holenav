import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "../../auth/AuthenticatedRoute";
import GetToken from "../../auth/GetToken";
import FrontPage from "../front-page/FrontPage";
import SettingsView from "../settings-view/SettingsView";
import SystemView from "../system-view/SystemView";

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
