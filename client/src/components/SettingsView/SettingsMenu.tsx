import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

const SettingsMenu = () => (
  <Box sx={{ bgcolor: "primary.main", maxWidth: "20rem", height: "100vh" }}>
    <nav aria-label="Settings Navigation Menu">
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
    </nav>
  </Box>
);

export default SettingsMenu;
