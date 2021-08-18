import { makeStyles, Theme } from "@material-ui/core";
import AppTitle from "./AppTitle";
import LoginButton from "./LoginButton";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  titleContainer: {
    paddingLeft: "1rem",
    backgroundColor: theme.palette.primary.dark,
  },
  buttonContainer: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "7rem",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <AppTitle />
      </div>
      <div className={classes.buttonContainer}>
        <LoginButton />
      </div>
    </div>
  );
};
