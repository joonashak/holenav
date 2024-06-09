import { createBrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import FrontPage from "./components/front-page/FrontPage";
import SettingsView from "./components/settings-view/SettingsView";
import SystemView from "./components/system-view/SystemView";
import GlobalErrorBoundary from "./error/GlobalErrorBoundary";
import NotFoundView from "./error/NotFoundView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "*",
    element: <AppContainer />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: "system/:systemName",
        element: <SystemView />,
      },
      {
        path: "settings",
        element: <SettingsView />,
      },
      {
        path: "*",
        element: <NotFoundView />,
      },
    ],
  },
]);

export default router;
