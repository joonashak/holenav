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

  return (
    <div className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">J123456 - K5A ABC</Typography>
        </Toolbar>
      </AppBar>
      <SystemInfo />
      <ScanningPanel />
      <IntelPanel />
    </div>
  );
};
