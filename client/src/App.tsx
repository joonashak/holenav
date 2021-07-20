import { Container, makeStyles, Theme } from "@material-ui/core";
import Router from "./components/Router";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    minHeight: "100vh",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} disableGutters className={classes.container}>
      <Router />
    </Container>
  );
};
