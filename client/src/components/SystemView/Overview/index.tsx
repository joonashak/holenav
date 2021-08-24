import {
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SystemInfo from "./SystemInfo";
import ScanningPanel from "./ScanningPanel";
import IntelPanel from "./IntelPanel";
import useSystemData from "../SystemData/useSystemData";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      width: "30rem",
    },
  },
}));

export default () => {
  const classes = useStyles();
  const { name } = useSystemData();

  return (
    <div className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{name} - [bm name]</Typography>
        </Toolbar>
      </AppBar>
      <SystemInfo />
      <ScanningPanel />
      <IntelPanel />
    </div>
  );
};
