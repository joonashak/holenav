import { ThemeProvider } from "@mui/material";
import GlobalNotification from "./components/GlobalNotification";
import useLocalData from "./components/LocalData/useLocalData";
import Router from "./components/Router";
import ViewportContainer from "./components/ViewportContainer";
import appTheme from "./theme";

export default () => {
  const { loadingLocalState } = useLocalData();

  if (loadingLocalState) {
    return null;
  }

  return (
    <ThemeProvider theme={appTheme}>
      <ViewportContainer>
        <Router />
        <GlobalNotification />
      </ViewportContainer>
    </ThemeProvider>
  );
};
