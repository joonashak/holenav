import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../auth/useAuth";
import useNotification from "../../../global-notification/useNotification";
import useLocalData from "../../../local-data/useLocalData";

const LogoutButton = () => {
  const { mocking } = useAuth();
  const { setAuthToken } = useLocalData();
  const navigate = useNavigate();
  const { showInfoNotification } = useNotification();

  const onClick = async () => {
    if (mocking) {
      showInfoNotification(
        "Logoff not implemented for mock users. Please use the dev toolbar.",
      );
      return;
    }
    // await logoutMutation();
    await setAuthToken(null);
    navigate("/");
  };

  return (
    <Button
      variant="outlined"
      color="warning"
      startIcon={<LogoutIcon />}
      onClick={onClick}
      data-cy="logout-button"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
