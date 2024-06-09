import { useQuery } from "@apollo/client";
import { UnauthorizedException } from "./error/exceptions/UnauthorizedException";
import { GetMyTokensDocument } from "./generated/graphqlOperations";

const AppContainer = () => {
  const { data, error, loading } = useQuery(GetMyTokensDocument);

  if (loading) {
    return null;
  }

  if (error?.graphQLErrors[0].extensions.code === "FORBIDDEN") {
    throw new UnauthorizedException();
  }

  if (!data || error) {
    throw new Error();
  }

  return "app";
};

export default AppContainer;
