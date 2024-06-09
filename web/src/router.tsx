import { createBrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import FrontPage from "./components/front-page/FrontPage";
import GlobalErrorBoundary from "./error/GlobalErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "*",
    element: <AppContainer />,
    errorElement: <GlobalErrorBoundary />,
  },
]);

export default router;
