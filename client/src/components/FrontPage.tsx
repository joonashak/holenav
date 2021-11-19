import { AppBar, Toolbar } from "@mui/material";
import AppTitle from "./common/AppTitle";
import LoginButton from "./common/LoginButton";
import useLocalData from "./LocalData/useLocalData";

export default () => {
  const { authToken, mockUser } = useLocalData();
  const loggedIn = authToken || mockUser;

  const LoginOrApp = () =>
    loggedIn ? <span>Go To App</span> : <LoginButton sx={{ marginBottom: { xs: 3, md: 0 } }} />;

  return (
    <AppBar sx={{ bgcolor: "primary.dark" }}>
      <Toolbar sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <AppTitle sx={{ flexGrow: 1 }} />
        <LoginOrApp />
      </Toolbar>
    </AppBar>
  );
};
