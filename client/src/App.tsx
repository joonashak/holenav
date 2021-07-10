import { Container, makeStyles, Theme } from "@material-ui/core";
import Overview from "./components/Overview";

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
      <Overview />
    </Container>
  );
};
