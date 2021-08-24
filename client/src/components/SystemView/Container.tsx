import { Container, makeStyles, Theme } from "@material-ui/core";
import { ReactChild } from "react";

type ContainerProps = {
  children: ReactChild;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    width: "100%",
    maxWidth: "100vw",
    height: "100vh",
    margin: 0,
  },
}));

export default ({ children }: ContainerProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} disableGutters>
      {children}
    </Container>
  );
};
