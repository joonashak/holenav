import {
  Box,
  BoxProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuDivider from "./MenuDivider";
import MenuItem from "./MenuItem";
import { settingsRoutes } from "..";
import SystemRoleGuard from "../../../auth/SystemRoleGuard";
import { SystemRoles } from "../../../generated/graphqlOperations";

type MenuContentProps = {
  sx?: BoxProps["sx"];
  bottomListSx?: ListProps["sx"];
};

const MenuContent = ({ sx, bottomListSx }: MenuContentProps) => (
  <nav aria-label="Personal Settings Navigation Menu">
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        pt: 5,
        ...sx,
      }}
    >
      <MenuDivider>Personal Settings</MenuDivider>
      <List>
        <MenuItem text="General" Icon={SettingsIcon} />
      </List>
      <MenuDivider>Folder Settings</MenuDivider>
      <List>
        <MenuItem text="Active Folder" Icon={FolderOpenIcon} href={settingsRoutes.activeFolder} />
        <SystemRoleGuard minRole={SystemRoles.Manager}>
          <MenuItem
            text="Folder Management"
            Icon={FolderSharedIcon}
            href={settingsRoutes.folderManagement}
          />
        </SystemRoleGuard>
      </List>
      <SystemRoleGuard minRole={SystemRoles.Manager}>
        <MenuDivider>Manager Settings</MenuDivider>
        <List>
          <MenuItem text="Users" Icon={GroupIcon} href={settingsRoutes.userManagement} />
        </List>
      </SystemRoleGuard>
      <SystemRoleGuard minRole={SystemRoles.Administrator}>
        <MenuDivider>Admin Settings</MenuDivider>
        <List>
          <MenuItem text="App Settings" Icon={SettingsIcon} />
        </List>
      </SystemRoleGuard>
      <List sx={{ bgcolor: "primary.light", ...bottomListSx }}>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ArrowBackIcon sx={{ color: "primary.dark" }} />
            </ListItemIcon>
            <ListItemText primary="Back To App" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  </nav>
);

MenuContent.defaultProps = {
  sx: {},
  bottomListSx: {},
};

export default MenuContent;
