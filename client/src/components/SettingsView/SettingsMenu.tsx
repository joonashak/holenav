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
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Folders" />
          </ListItemButton>
        </ListItem>
      </List>
      <MenuDivider>Admin Settings</MenuDivider>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
      </List>
      <List sx={{ position: "absolute", bottom: 0 }}>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Back To App" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  </nav>
);

export default SettingsMenu;
