import { Button } from "@material-ui/core";
import axios from "axios";

export default () => {
  const onClick = async () =>
    axios.get("http://localhost:3001/auth/cookie-test", {
      withCredentials: true,
    });

  return <Button onClick={onClick}>Login Test</Button>;
};
