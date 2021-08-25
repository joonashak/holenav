import { ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "./auth/useAuth";
import Router from "./components/Router";
import ViewportContainer from "./components/ViewportContainer";
import appTheme from "./theme";

export default () => (
  <ThemeProvider theme={appTheme}>
    <AuthProvider>
      <ViewportContainer>
        <Router />
      </ViewportContainer>
    </AuthProvider>
  </ThemeProvider>
);
