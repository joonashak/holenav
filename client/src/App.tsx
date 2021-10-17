import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
import { AuthProvider } from "./auth/useAuth";
import GlobalNotification from "./components/GlobalNotification";
import { NotificationProvider } from "./components/GlobalNotification/useNotification";
import Router from "./components/Router";
import ViewportContainer from "./components/ViewportContainer";
import appTheme from "./theme";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export default () => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={appTheme}>
      <NotificationProvider>
        <AuthProvider>
          <ViewportContainer>
            <Router />
            <GlobalNotification />
          </ViewportContainer>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);
