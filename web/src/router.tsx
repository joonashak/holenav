import { createBrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import FrontPage from "./components/front-page/FrontPage";
import FolderDialog from "./components/settings/folder-settings/FolderDialog";
import FolderSettings from "./components/settings/folder-settings/FolderSettings";
import MapDialog from "./components/system-view/floating-mapper-controls/map-select/MapDialog";
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
        children: [
          { path: "new-map", element: <MapDialog /> },
          { path: "edit-map", element: <MapDialog edit /> },
          { path: "folder-options", element: <FolderSettings /> },
          { path: "new-folder", element: <FolderDialog /> },
        ],
      },
      { path: "*", element: <NotFoundView /> },
    ],
  },
]);

export default router;
