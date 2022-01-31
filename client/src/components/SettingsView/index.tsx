import { Box } from "@mui/material";
import SettingsMenu from "./SettingsMenu";

const SettingsView = () => {
  console.log("asd");

  return (
    <Box sx={{ bgcolor: "primary.dark", minHeight: "100vh" }}>
      <SettingsMenu />
    </Box>
  );
};

export default SettingsView;
