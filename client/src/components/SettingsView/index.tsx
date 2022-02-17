import { Box } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import GeneralSettings from "./personal/GeneralSettings";
import SettingsMenu from "./SettingsMenu";

export const menuWidthRem = 20;

const SettingsView = () => (
  <Box sx={{ bgcolor: "primary.dark", minHeight: "100vh" }}>
    <SettingsMenu />
    <Box sx={{ ml: { md: `${menuWidthRem + 1}rem` } }}>
      <Switch>
        <Route path="*" component={GeneralSettings} />
      </Switch>
    </Box>
  </Box>
);

export default SettingsView;
