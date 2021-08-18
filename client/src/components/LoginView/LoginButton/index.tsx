import { Button } from "@material-ui/core";
import ssoLogo from "./eve_sso_login_button_dark.png";

export default () => {
  const loginUrl = `${process.env.REACT_APP_CMS_URL}/auth/login`;

  return (
    <Button href={loginUrl}>
      <img src={ssoLogo} alt="Log In With EVE Online" />
    </Button>
  );
};
