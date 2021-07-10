import { Container, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    minHeight: "100vh",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container}>
      asdasdsasdasda
    </Container>
  );
};
