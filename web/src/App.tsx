import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import ViewportContainer from "./components/ViewportContainer";
import GlobalNotification from "./components/global-notification/GlobalNotification";
import { endpoints } from "./config";
import router from "./router";
import appTheme from "./theme";

const apolloClient = new ApolloClient({
  uri: endpoints.graphQl,
  cache: new InMemoryCache(),
  credentials: "include",
});

const App = () => (
  <ThemeProvider theme={appTheme}>
    <CssBaseline />
    <ApolloProvider client={apolloClient}>
      <ViewportContainer>
        <RouterProvider router={router} />
        <GlobalNotification />
      </ViewportContainer>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
