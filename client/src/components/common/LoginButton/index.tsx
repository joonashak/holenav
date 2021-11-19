import { Button, ButtonProps } from "@mui/material";
import { endpoints } from "../../../config";
import ssoLogo from "./eve_sso_login_button_dark.png";

export default (props: ButtonProps) => (
  <Button href={endpoints.login} {...props}>
    <img src={ssoLogo} alt="Log In With EVE Online" />
  </Button>
);
