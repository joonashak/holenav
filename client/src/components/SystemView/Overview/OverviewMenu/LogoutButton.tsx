import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import useAuth from "../../../../auth/useAuth";
import useNotification from "../../../GlobalNotification/useNotification";

const LogoutButton = () => {
  const { logout, mocking } = useAuth();
  const history = useHistory();
  const { showInfoNotification } = useNotification();

  const onClick = async () => {
    if (mocking) {
      showInfoNotification("Logoff not implemented for mock users. Please use the dev toolbar.");
      return;
    }
    await logout();
    history.push("/");
  };

  return (
    <Button variant="outlined" color="secondary" onClick={onClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;
