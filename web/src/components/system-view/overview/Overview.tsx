import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import OverviewTitle from "./OverviewTitle";
import IntelPanel from "./intel-panel/IntelPanel";
import OverviewMenu from "./overview-menu/OverviewMenu";
import ScanningPanel from "./scanning-panel/ScanningPanel";
import SystemInfo from "./system-info/SystemInfo";

const Overview = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <Box
      sx={{
        zIndex: 1,
        height: "fit-content",
        width: {
          xs: "100vw",
          sm: "30rem",
        },
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="Open Menu"
            onClick={toggleMenu}
            size="large"
            data-cy="open-main-menu"
          >
            <MenuIcon />
          </IconButton>
          <OverviewMenu open={menuOpen} toggle={toggleMenu} />
          <OverviewTitle />
        </Toolbar>
      </AppBar>
      <SystemInfo />
      <ScanningPanel />
      <IntelPanel />
    </Box>
  );
};

export default Overview;
