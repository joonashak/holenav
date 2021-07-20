import { BrowserRouter, Route, Switch } from "react-router-dom";
import Overview from "./Overview";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Overview />
      </Route>
    </Switch>
  </BrowserRouter>
);
