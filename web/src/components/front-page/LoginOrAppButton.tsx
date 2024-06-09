import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/material";
import GoToButton from "../common/GoToButton";
import LoginButton from "../common/login-button/LoginButton";

type LoginOrAppButtonProps = {
  loggedIn: boolean;
};

const LoginOrAppButton = ({ loggedIn }: LoginOrAppButtonProps) =>
  loggedIn ? (
    <GoToButton
      href="/system/J104809"
      endIcon={<ArrowForwardIcon />}
      sx={{ mb: { xs: 3, md: 0 } }}
    >
      Go To App
    </GoToButton>
  ) : (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <LoginButton sx={{ mb: { xs: 3, md: 1 }, pl: 0, pr: 0 }} />
    </Box>
  );

export default LoginOrAppButton;
