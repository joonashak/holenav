import { Box } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import GeneralSettings from "./personal/GeneralSettings";
import SettingsMenu from "./SettingsMenu";

const SettingsView = () => (
  <Box sx={{ bgcolor: "primary.dark", minHeight: "100vh" }}>
    <SettingsMenu />
    <Switch>
      <Route path="*" component={GeneralSettings} />
    </Switch>
  </Box>
);

export default SettingsView;
