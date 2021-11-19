import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import useAuth from "../../../../auth/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const onClick = async () => {
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
