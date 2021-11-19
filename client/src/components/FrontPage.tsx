import { AppBar, Toolbar } from "@mui/material";
import AppTitle from "./common/AppTitle";
import GoToButton from "./common/GoToButton";
import LoginButton from "./common/LoginButton";
import useLocalData from "./LocalData/useLocalData";

export default () => {
  const { authToken, mockUser } = useLocalData();
  const loggedIn = authToken || mockUser;

  const buttonSx = { marginBottom: { xs: 3, md: 0 } };

  const LoginOrApp = () =>
    loggedIn ? (
      <GoToButton href="/system/Jita" sx={buttonSx}>
        Go To App
      </GoToButton>
    ) : (
      <LoginButton sx={buttonSx} />
    );

  return (
    <AppBar sx={{ bgcolor: "primary.dark" }}>
      <Toolbar sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <AppTitle sx={{ flexGrow: 1 }} />
        <LoginOrApp />
      </Toolbar>
    </AppBar>
  );
};
