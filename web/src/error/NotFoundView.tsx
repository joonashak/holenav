import { AlertTitle } from "@mui/material";
import { useLocation } from "react-router-dom";
import FatalErrorView from "./FatalErrorView";

const NotFoundView = () => {
  const location = useLocation();

  return (
    <FatalErrorView>
      <AlertTitle color="inherit">Not Found</AlertTitle>
      The path you navigated to (<code>{location.pathname}</code>) does not
      match any view in this application.
    </FatalErrorView>
  );
};

export default NotFoundView;
