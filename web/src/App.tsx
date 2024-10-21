import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import ViewportContainer from "./components/ViewportContainer";
import GlobalNotification from "./components/global-notification/GlobalNotification";
import useLocalData from "./components/local-data/useLocalData";
import { devToolsEnabled, endpoints } from "./config";
import DevTools from "./dev/dev-tools/DevTools";
import router from "./router";
import appTheme from "./theme";

const apolloClient = new ApolloClient({
  uri: endpoints.graphQl,
  cache: new InMemoryCache(),
  credentials: "include",
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
        <ViewportContainer>
          <RouterProvider router={router} />
          <GlobalNotification />
        </ViewportContainer>
        {devToolsEnabled && <DevTools />}
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
