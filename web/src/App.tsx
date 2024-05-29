import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ViewportContainer from "./components/ViewportContainer";
import GlobalNotification from "./components/global-notification/GlobalNotification";
import useLocalData from "./components/local-data/useLocalData";
import Router from "./components/router/Router";
import UserData from "./components/user-data/UserData";
import { devToolsEnabled, endpoints } from "./config";
import DevTools from "./dev/dev-tools/DevTools";
import appTheme from "./theme";

const apolloClient = new ApolloClient({
  uri: endpoints.graphQl,
  cache: new InMemoryCache(),
});

const App = () => {
  const { loadingLocalState } = useLocalData();

  if (loadingLocalState) {
    return null;
  }

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <UserData>
          <ViewportContainer>
            <Router />
            <GlobalNotification />
          </ViewportContainer>
        </UserData>
        {devToolsEnabled && <DevTools />}
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
