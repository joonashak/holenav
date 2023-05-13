import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import useAuth from "../../../../auth/useAuth";
import useAuthenticatedMutation from "../../../../auth/useAuthenticatedMutation";
import { LogoutDocument } from "../../../../generated/graphqlOperations";
import useNotification from "../../../GlobalNotification/useNotification";
import useLocalData from "../../../LocalData/useLocalData";

const LogoutButton = () => {
  const { mocking } = useAuth();
  const { setAuthToken } = useLocalData();
  const history = useHistory();
  const { showInfoNotification } = useNotification();

  const [logoutMutation] = useAuthenticatedMutation(LogoutDocument);

  const onClick = async () => {
    if (mocking) {
      showInfoNotification("Logoff not implemented for mock users. Please use the dev toolbar.");
      return;
    }
    await logoutMutation();
    await setAuthToken(null);
    history.push("/");
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
