import { Alert } from "@mui/material";
import { useRouteError } from "react-router-dom";
import { UnauthorizedException } from "./exceptions/UnauthorizedException";

const GlobalErrorBoundary = () => {
  const error = useRouteError();

  if (error instanceof UnauthorizedException) {
    return "pitäis kirjautua uudelleen";
  }

  return <Alert severity="error">Unknown error happened.</Alert>;
};

export default GlobalErrorBoundary;
