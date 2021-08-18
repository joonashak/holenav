import { makeStyles } from "@material-ui/core";
import LoginButton from "./LoginButton";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LoginButton />
    </div>
  );
};
