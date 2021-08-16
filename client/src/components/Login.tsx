import { Button } from "@material-ui/core";
import axios from "axios";

export default () => {
  const onClick = async () =>
    axios.get("http://65.21.180.194/auth/cookie-test", {
      withCredentials: true,
    });

  return <Button onClick={onClick}>Login Test</Button>;
};
