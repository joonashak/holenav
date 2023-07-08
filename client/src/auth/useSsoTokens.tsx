import {
  GetSsoTokensDocument,
  GetSsoTokensQuery,
  GetSsoTokensQueryVariables,
} from "../generated/graphqlOperations";
import useAuthenticatedQuery from "./useAuthenticatedQuery";

const useSsoTokens = () => {
  const getSsoTokens = useAuthenticatedQuery<GetSsoTokensQuery, GetSsoTokensQueryVariables>(
    GetSsoTokensDocument,
  );

  return {
    getSsoTokens,
  };
};

export default useSsoTokens;
