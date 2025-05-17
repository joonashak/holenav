import { useQuery } from "@apollo/client";
import { Outlet } from "react-router-dom";
import { UnauthorizedException } from "./error/exceptions/UnauthorizedException";
import { GetMyTokensDocument } from "./generated/graphql-operations";

const AppContainer = () => {
  const { data, error, loading } = useQuery(GetMyTokensDocument);

  if (loading) {
    return null;
  }

  if (error?.graphQLErrors[0].extensions?.code === "FORBIDDEN") {
    throw new UnauthorizedException();
  }

  if (!data || error) {
    throw new Error();
  }

  return <Outlet />;
};

export default AppContainer;
