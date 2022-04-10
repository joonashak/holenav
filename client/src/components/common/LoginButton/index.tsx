import { useLazyQuery } from "@apollo/client";
import { Button, ButtonProps } from "@mui/material";
import { StartSsoLoginDocument } from "../../../generated/graphqlOperations";
import ssoLogo from "./eve_sso_login_button_dark.png";

export default (props: ButtonProps) => {
  const [ssoLoginQuery] = useLazyQuery(StartSsoLoginDocument, {
    onCompleted: ({ startSsoLogin }) => {
      window.location.href = startSsoLogin.ssoLoginUrl;
    },
  });

  return (
    <Button onClick={() => ssoLoginQuery()} {...props}>
      <img src={ssoLogo} alt="Log In With EVE Online" />
    </Button>
  );
};
