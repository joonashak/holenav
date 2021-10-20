import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SystemInfo from "./SystemInfo";
import ScanningPanel from "./ScanningPanel";
import IntelPanel from "./IntelPanel";
import useSystemData from "../SystemData/useSystemData";
import OverviewMenu from "./OverviewMenu";

export default () => {
  const { name } = useSystemData();
  const [menuOpen, setMenuOpen] = useState(true);
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
          <IconButton edge="start" aria-label="Open Menu" onClick={toggleMenu} size="large">
            <MenuIcon />
          </IconButton>
          <OverviewMenu open={menuOpen} toggle={toggleMenu} />
          <Typography variant="h6">{name} - [bm name]</Typography>
        </Toolbar>
      </AppBar>
      <SystemInfo />
      <ScanningPanel />
      <IntelPanel />
    </Box>
  );
};
