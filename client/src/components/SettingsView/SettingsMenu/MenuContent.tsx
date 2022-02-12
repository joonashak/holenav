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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuDivider from "./MenuDivider";

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
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="General" />
          </ListItemButton>
        </ListItem>
      </List>
      <MenuDivider>Admin Settings</MenuDivider>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
      </List>
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
