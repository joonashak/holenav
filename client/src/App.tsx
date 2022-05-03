import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import GlobalNotification from "./components/GlobalNotification";
import useLocalData from "./components/LocalData/useLocalData";
import Router from "./components/Router";
import SettingsData from "./components/SettingsView/SettingsData";
import UserData from "./components/UserData";
import ViewportContainer from "./components/ViewportContainer";
import { endpoints } from "./config";
import appTheme from "./theme";

const apolloClient = new ApolloClient({
  uri: endpoints.graphQl,
  cache: new InMemoryCache(),
});

export default () => {
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
      </ApolloProvider>
    </ThemeProvider>
  );
};
