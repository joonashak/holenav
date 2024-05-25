import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import GlobalNotification from "./components/GlobalNotification";
import useLocalData from "./components/LocalData/useLocalData";
import Router from "./components/Router";
import SettingsData from "./components/SettingsView/SettingsData";
import UserData from "./components/UserData";
import ViewportContainer from "./components/ViewportContainer";
import { devToolsEnabled, endpoints } from "./config";
import DevTools from "./dev/DevTools";
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
          <SettingsData>
            <ViewportContainer>
              <Router />
              <GlobalNotification />
            </ViewportContainer>
          </SettingsData>
        </UserData>
        {devToolsEnabled && <DevTools />}
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
