import { Box } from "@mui/material";
import AppTitle from "./AppTitle";
import LoginButton from "./LoginButton";

export default () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    }}
  >
    <Box
      sx={{
        paddingLeft: "1rem",
        backgroundColor: "primary.dark",
      }}
    >
      <AppTitle />
    </Box>
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "7rem",
      }}
    >
      <LoginButton />
    </Box>
  </Box>
);
