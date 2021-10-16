import { makeStyles, Theme, AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import SystemInfo from "./SystemInfo";
import ScanningPanel from "./ScanningPanel";
import IntelPanel from "./IntelPanel";
import useSystemData from "../SystemData/useSystemData";
import OverviewMenu from "./OverviewMenu";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    zIndex: 1,
    height: "fit-content",
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      width: "30rem",
    },
  },
}));

export default () => {
  const classes = useStyles();
  const { name } = useSystemData();
  const [menuOpen, setMenuOpen] = useState(true);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="Open Menu" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <OverviewMenu open={menuOpen} toggle={toggleMenu} />
          <Typography variant="h6">{name} - [bm name]</Typography>
        </Toolbar>
      </AppBar>
      <SystemInfo />
      <ScanningPanel />
      <IntelPanel />
    </div>
  );
};
