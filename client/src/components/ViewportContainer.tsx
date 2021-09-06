import { Container, makeStyles, Theme } from "@material-ui/core";
import { ReactChild } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    minHeight: "100vh",
  },
}));

interface ViewportContainerProps {
  children: ReactChild | ReactChild[];
}

export default ({ children }: ViewportContainerProps) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} disableGutters className={classes.container}>
      {children}
    </Container>
  );
};
