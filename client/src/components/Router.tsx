import { BrowserRouter, Route, Switch } from "react-router-dom";
import GetToken from "./GetToken";
import Login from "./Login";
import Overview from "./Overview";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/login/:state" exact component={GetToken} />
      <Route path="/">
        <Overview />
      </Route>
    </Switch>
  </BrowserRouter>
);
