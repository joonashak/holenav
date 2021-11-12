import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./auth/useAuth";
import GlobalNotification from "./components/GlobalNotification";
import { NotificationProvider } from "./components/GlobalNotification/useNotification";
import LocalDataProvider from "./components/LocalData";
import Router from "./components/Router";
import ViewportContainer from "./components/ViewportContainer";
import appTheme from "./theme";

export default () => (
  <ThemeProvider theme={appTheme}>
    <LocalDataProvider>
      <NotificationProvider>
        <AuthProvider>
          <ViewportContainer>
            <Router />
            <GlobalNotification />
          </ViewportContainer>
        </AuthProvider>
      </NotificationProvider>
    </LocalDataProvider>
  </ThemeProvider>
);
