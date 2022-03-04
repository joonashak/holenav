import { BrowserRouter, Route, Switch } from "react-router-dom";
import GetToken from "../../auth/GetToken";
import SystemView from "../SystemView";
import DevTools from "../../dev/DevTools";
import FrontPage from "../FrontPage";
import { devToolsEnabled } from "../../config";
import SystemData from "../SystemView/SystemData";
import SettingsView from "../SettingsView";
import AuthenticatedRouteWrapper from "../SettingsView/folder/AuthenticatedRouteWrapper";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login/:state" exact component={GetToken} />

      <AuthenticatedRouteWrapper path="/system">
        <SystemData>
          <Switch>
            <Route path="/system/:systemName" exact component={SystemView} />
          </Switch>
        </SystemData>
      </AuthenticatedRouteWrapper>

      <AuthenticatedRouteWrapper path="/settings">
        <Route path="/settings" component={SettingsView} />
      </AuthenticatedRouteWrapper>

      <Route path="*" component={FrontPage} />
    </Switch>
    {devToolsEnabled && <DevTools />}
  </BrowserRouter>
);
