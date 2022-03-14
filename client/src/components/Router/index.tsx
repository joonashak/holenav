import { BrowserRouter, Route, Switch } from "react-router-dom";
import GetToken from "../../auth/GetToken";
import SystemView from "../SystemView";
import DevTools from "../../dev/DevTools";
import FrontPage from "../FrontPage";
import { devToolsEnabled } from "../../config";
import SettingsView from "../SettingsView";

// FIXME: Refactor AuthenticationGuard -> AuthenticatedRoute to replace vanilla <Route> for per-route auth guarding.
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login/:state" exact component={GetToken} />
      <Route path="/system/:systemName" exact component={SystemView} />
      <Route path="/settings" component={SettingsView} />
      <Route path="*" component={FrontPage} />
    </Switch>
    {devToolsEnabled && <DevTools />}
  </BrowserRouter>
);
