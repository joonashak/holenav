import { Box } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import AppSettings from "./app-settings/AppSettings";
import ActiveFolder from "./folder/ActiveFolder";
import FolderManagement from "./folder/folder-management/FolderManagement";
import GeneralSettings from "./personal/GeneralSettings";
import SettingsMenu from "./settings-menu/SettingsMenu";
import UserManagement from "./user-management/UserManagement";

export const menuWidthRem = 20;

export const settingsRoutes = {
  activeFolder: "/settings/folder/active",
  folderManagement: "/settings/folder/management",
  userManagement: "/settings/users",
  appSettings: "/settings/app",
};

const SettingsView = () => (
  <Box sx={{ bgcolor: "primary.dark", height: "100vh", overflow: "scroll" }}>
    <SettingsMenu />
    <Box sx={{ ml: { xs: 2, md: `${menuWidthRem + 2}rem` }, mr: 2, pt: 2 }}>
      <Switch>
        <Route path={settingsRoutes.activeFolder} component={ActiveFolder} />
        <Route
          path={settingsRoutes.folderManagement}
          component={FolderManagement}
        />
        <Route
          path={settingsRoutes.userManagement}
          component={UserManagement}
        />
        <Route path={settingsRoutes.appSettings} component={AppSettings} />
        <Route path="*" component={GeneralSettings} />
      </Switch>
    </Box>
  </Box>
);

export default SettingsView;
