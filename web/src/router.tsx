import { createBrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import FrontPage from "./components/front-page/FrontPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "*",
    element: <AppContainer />,
  },
]);

export default router;
