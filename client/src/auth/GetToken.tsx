import { useEffect } from "react";
import useAuth from "./useAuth";

interface GetTokenProps {
  match: {
    params: {
      state: string;
    };
  };
}

export default ({ match }: GetTokenProps) => {
  const { state } = match.params;
  const { fetchAndSaveToken } = useAuth();

  useEffect(() => {
    (async () => fetchAndSaveToken(state))();
  }, []);

  return <div>moi</div>;
};
