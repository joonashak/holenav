import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import useLocalData from "../components/LocalData/useLocalData";
import { GetTokenDocument } from "../generated/graphqlOperations";

interface GetTokenProps {
  match: {
    params: {
      state: string;
    };
  };
}

export default ({ match }: GetTokenProps) => {
  const { state } = match.params;
  const { setAuthToken } = useLocalData();
  const [fetchAndSaveToken, { loading, called }] = useMutation(GetTokenDocument, {
    onCompleted: async ({ getToken }) => {
      await setAuthToken(getToken.accessToken);
    },
  });

  useEffect(() => {
    (async () => {
      fetchAndSaveToken({ variables: { state } });
    })();
  }, []);

  if (!called || loading) {
    return null;
  }

  return <Redirect to="/system/J104809" />;
};
