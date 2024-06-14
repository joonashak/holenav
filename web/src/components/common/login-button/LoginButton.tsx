import { Button, ButtonProps } from "@mui/material";
import { backendUrl } from "../../../config";
import ssoLogo from "./eve_sso_login_button_dark.png";

const LoginButton = (props: ButtonProps) => (
  <Button
    onClick={() => {
      window.location.href = `${backendUrl}/sso/login?afterLoginUrl=${window.location.href}`;
    }}
    {...props}
  >
    <img src={ssoLogo} alt="Log In With EVE Online" />
  </Button>
);

export default LoginButton;
