import { AppBar, Box, Container, Link, Paper, Toolbar, Typography } from "@mui/material";
import { devToolsEnabled } from "../../config";
import AppTitle from "../common/AppTitle";
import GoToButton from "../common/GoToButton";
import LoginButton from "../common/LoginButton";
import useLocalData from "../LocalData/useLocalData";
import LocalLogin from "../LocalLogin";
import DevToolsNotice from "./DevToolsNotice";

export default () => {
  const { authToken, mockUser } = useLocalData();
  const loggedIn = authToken || mockUser;

  const LoginOrApp = () =>
    loggedIn ? (
      <GoToButton href="/system/J104809" sx={{ mb: { xs: 3, md: 0 } }}>
        Go To App
      </GoToButton>
    ) : (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <LoginButton sx={{ mb: { xs: 3, md: 1 }, pl: 0, pr: 0 }} />
        <LocalLogin />
      </Box>
    );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "primary.dark", marginBottom: 6 }}>
        <Toolbar sx={{ flexDirection: { xs: "column", md: "row" } }}>
          <AppTitle sx={{ flexGrow: 1 }} />
          <LoginOrApp />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ bgcolor: "transparent", "&&>*": { marginBottom: 2 } }}>
          <Typography variant="h2">Welcome to Holenav!</Typography>
          <Typography>
            This is a new wormhole mapper for the EVE Online community. It is currently in early
            development and not ready for operational use. You are welcome to try it out and follow
            the project&apos;s progress at{" "}
            <Link
              href="https://github.com/joonashak/holenav"
              target="_blank"
              rel="noreferrer"
              color="secondary"
            >
              https://github.com/joonashak/holenav
            </Link>
            .
          </Typography>
        </Paper>
        {devToolsEnabled && <DevToolsNotice />}
      </Container>
    </>
  );
};
