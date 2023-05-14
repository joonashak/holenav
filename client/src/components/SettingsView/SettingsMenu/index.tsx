import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { menuWidthRem } from "..";
import useLayout from "../../../utils/useLayout";
import GoToButton from "../../common/GoToButton";
import MenuContent from "./MenuContent";

const SidebarMenu = () => (
  <MenuContent
    sx={{ height: "100vh", width: `${menuWidthRem}rem`, position: "fixed" }}
    bottomListSx={{ position: "fixed", bottom: 0, width: `${menuWidthRem}rem` }}
  />
);

const DrawerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar>
        <IconButton aria-label="Open Settings Menu" onClick={toggleMenu} size="large" edge="start">
          <MenuIcon />
        </IconButton>
        <Drawer anchor="top" open={menuOpen} onClose={toggleMenu}>
          <MenuContent bottomListSx={{ display: "none" }} />
        </Drawer>
        <Typography variant="h6" sx={{ flexGrow: 1, pl: 1 }}>
          Settings
        </Typography>
        <GoToButton href="/system/Jita" endIcon={null} size="small">
          Back To App
        </GoToButton>
      </Toolbar>
    </AppBar>
  );
};

const SettingsMenu = () => {
  const { wideViewport } = useLayout();

  return wideViewport ? <SidebarMenu /> : <DrawerMenu />;
};

export default SettingsMenu;
