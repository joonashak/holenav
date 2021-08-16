import { Button } from "@material-ui/core";

export default () => {
  const loginUrl = `${process.env.REACT_APP_CMS_URL}/auth/login`;

  return <Button href={loginUrl}>Login</Button>;
};
