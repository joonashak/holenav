import { useRouteError } from "react-router-dom";
import FatalErrorView from "./FatalErrorView";
import { UnauthorizedException } from "./exceptions/UnauthorizedException";

const GlobalErrorBoundary = () => {
  const error = useRouteError();

  if (error instanceof UnauthorizedException) {
    return "pitäis kirjautua uudelleen";
  }

  return <FatalErrorView>Unknown error happened.</FatalErrorView>;
};

export default GlobalErrorBoundary;
