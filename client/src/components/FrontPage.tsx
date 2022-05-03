import { AppBar, Box, Container, Link, Paper, Toolbar, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { devToolsEnabled } from "../config";
import AppTitle from "./common/AppTitle";
import GoToButton from "./common/GoToButton";
import LoginButton from "./common/LoginButton";
import useLocalData from "./LocalData/useLocalData";
import LocalLogin from "./LocalLogin";

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

  const DevToolsNotice = () => (
    <Paper
      elevation={5}
      sx={{
        bgcolor: yellow[600],
        color: "primary.dark",
        padding: 2,
        marginTop: 6,
        "&&>*": { marginBottom: 2 },
      }}
    >
      <Typography variant="h3">Dev Tools Are Enabled</Typography>
      <Typography color="primary.dark">
        You can access the development toolbar using the wrench icon in the right bottom corner.
        This allows, e.g., trying out Holenav without having an EVE Online account. Please note that
        the user mocking feature allows anyone to mock the admin user and thus access other
        users&apos; data. You should take care not to enter any data that might jeopardize your
        in-game operational security.
      </Typography>
      <Typography color="primary.dark">
        The same guidelines apply when using this instance of Holenav through EVE SSO login. Use
        only such characters that you do not mind leaking the information of.
      </Typography>
      <Typography color="primary.dark">
        Feel free to use the <i>Seed Database</i> button to reset into the standard testing and
        development dataset. If something is broken, it&apos;s worth a try, and you should probably
        also reset the data after you are done testing.
      </Typography>
    </Paper>
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
