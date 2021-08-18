import { BrowserRouter, Route, Switch } from "react-router-dom";
import GetToken from "./GetToken";
import LoginView from "./LoginView";
import SystemView from "./SystemView";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login/:state" exact component={GetToken} />
      <Route path="/system/:systemName" exact component={SystemView} />
      <Route path="/" component={LoginView} />
    </Switch>
  </BrowserRouter>
);
