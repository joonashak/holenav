import { useState } from "react";
import { AppBar, Drawer, IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuContent from "./MenuContent";

const SidebarMenu = () => <MenuContent />;

const DrawerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <AppBar>
      <Toolbar>
        <IconButton aria-label="Open Settings Menu" onClick={toggleMenu} size="large">
          <MenuIcon />
        </IconButton>
        <Drawer anchor="top" open={menuOpen} onClose={toggleMenu}>
          <MenuContent />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

const SettingsMenu = () => {
  const theme = useTheme();
  const wideViewport = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });

  return wideViewport ? <SidebarMenu /> : <DrawerMenu />;
};

export default SettingsMenu;
