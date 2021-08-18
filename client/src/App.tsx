import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "./auth/useAuth";
import Router from "./components/Router";
import ViewportContainer from "./components/ViewportContainer";
import appTheme from "./theme";

const apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_CMS_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default () => (
  <ThemeProvider theme={appTheme}>
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <ViewportContainer>
          <Router />
        </ViewportContainer>
      </ApolloProvider>
    </AuthProvider>
  </ThemeProvider>
);
