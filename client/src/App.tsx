import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Container, makeStyles, Theme } from "@material-ui/core";
import Router from "./components/Router";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    minHeight: "100vh",
  },
}));

const apolloClient = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default () => {
  const classes = useStyles();

  return (
    <ApolloProvider client={apolloClient}>
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Router />
      </Container>
    </ApolloProvider>
  );
};
