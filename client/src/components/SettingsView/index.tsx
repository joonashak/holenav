import { Box } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import ActiveFolder from "./folder/ActiveFolder";
import GeneralSettings from "./personal/GeneralSettings";
import SettingsData from "./SettingsData";
import SettingsMenu from "./SettingsMenu";

export const menuWidthRem = 20;

export const settingsRoutes = {
  activeFolder: "/settings/activeFolder",
};

const SettingsView = () => (
  <SettingsData>
    <Box sx={{ bgcolor: "primary.dark", minHeight: "100vh" }}>
      <SettingsMenu />
      <Box sx={{ ml: { xs: 2, md: `${menuWidthRem + 2}rem` }, mr: 2, pt: 2 }}>
        <Switch>
          <Route path={settingsRoutes.activeFolder} component={ActiveFolder} />
          <Route path="*" component={GeneralSettings} />
        </Switch>
      </Box>
    </Box>
  </SettingsData>
);

export default SettingsView;
