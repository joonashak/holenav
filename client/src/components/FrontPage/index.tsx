import { AppBar, Container, Link, Paper, Toolbar, Typography } from "@mui/material";
import { devToolsEnabled } from "../../config";
import AppTitle from "../common/AppTitle";
import useLocalData from "../LocalData/useLocalData";
import DevToolsNotice from "./DevToolsNotice";
import LoginOrAppButton from "./LoginOrAppButton";
import Motd from "./Motd";

const FrontPage = () => {
  const { authToken, mockUser } = useLocalData();
  const loggedIn = authToken || mockUser;

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "primary.dark", marginBottom: 6 }}>
        <Toolbar sx={{ flexDirection: { xs: "column", md: "row" } }}>
          <AppTitle sx={{ flexGrow: 1 }} />
          <LoginOrAppButton loggedIn={!!loggedIn} />
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
        <Motd />
        {devToolsEnabled && <DevToolsNotice />}
      </Container>
    </>
  );
};

export default FrontPage;
