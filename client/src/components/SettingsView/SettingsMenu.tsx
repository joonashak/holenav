import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ReactNode } from "react";

type MenuDividerProps = {
  children: ReactNode;
};

const MenuDivider = ({ children }: MenuDividerProps) => (
  <Divider
    sx={{
      color: "secondary.light",
      "&::before, &::after": {
        borderColor: "secondary.dark",
        zIndex: 0,
      },
    }}
  >
    <Typography variant="h3">{children}</Typography>
  </Divider>
);

const SettingsMenu = () => (
  <nav aria-label="Personal Settings Navigation Menu">
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        maxWidth: "20rem",
        height: "100vh",
        pt: 5,
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
      <List sx={{ position: "absolute", bottom: 0, bgcolor: "primary.light" }}>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ArrowBackIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Back To App" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  </nav>
);

export default SettingsMenu;
