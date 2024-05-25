import { useLazyQuery } from "@apollo/client";
import { Button, ButtonProps } from "@mui/material";
import { StartSsoLoginDocument } from "../../../generated/graphqlOperations";
import ssoLogo from "./eve_sso_login_button_dark.png";

const LoginButton = (props: ButtonProps) => {
  const [ssoLoginQuery] = useLazyQuery(StartSsoLoginDocument, {
    onCompleted: ({ startSsoLogin }) => {
      window.location.href = startSsoLogin.ssoLoginUrl;
    },
  });

  const onClick = () => ssoLoginQuery();

  return (
    <Button onClick={onClick} {...props}>
      <img src={ssoLogo} alt="Log In With EVE Online" />
    </Button>
  );
};

export default LoginButton;
