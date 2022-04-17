import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthenticatedApolloProvider } from "./auth/useAuthenticatedApollo";
import GlobalNotification from "./components/GlobalNotification";
import useLocalData from "./components/LocalData/useLocalData";
import Router from "./components/Router";
import SettingsData from "./components/SettingsView/SettingsData";
import UserData from "./components/UserData";
import ViewportContainer from "./components/ViewportContainer";
import appTheme from "./theme";

export default () => {
  const { loadingLocalState } = useLocalData();

  if (loadingLocalState) {
    return null
  }

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthenticatedApolloProvider>
        <UserData>
          <SettingsData>
            <ViewportContainer>
              <Router />
              <GlobalNotification />
            </ViewportContainer>
          </SettingsData>
        </UserData>
      </AuthenticatedApolloProvider>
    </ThemeProvider>
  );
};
