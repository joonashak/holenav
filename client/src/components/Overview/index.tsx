import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, Theme } from "@material-ui/core";

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
    </div>
  );
};
