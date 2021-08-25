import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
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
  const [pending, setPending] = useState(true);
  const { fetchAndSaveToken } = useAuth();

  useEffect(() => {
    (async () => {
      await fetchAndSaveToken(state);
      setPending(false);
    })();
  }, []);

  if (pending) {
    return null;
  }

  return <Redirect to="/system/Jita" />;
};
