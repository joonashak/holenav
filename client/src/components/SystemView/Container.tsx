import { Container, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { ReactChild } from "react";

type ContainerProps = {
  children: ReactChild | ReactChild[];
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
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
