import { Button } from "@material-ui/core";
import { endpoints } from "../../../config";
import ssoLogo from "./eve_sso_login_button_dark.png";

export default () => (
  <Button href={endpoints.login}>
    <img src={ssoLogo} alt="Log In With EVE Online" />
  </Button>
);
