import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Overview from "./Overview";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/">
        <Overview />
      </Route>
    </Switch>
  </BrowserRouter>
);
