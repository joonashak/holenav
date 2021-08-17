import { useEffect } from "react";
import useAuth from "../auth/useAuth";

export default (props: any) => {
  // eslint-disable-next-line
  const { state } = props.match.params;
  const { fetchAndSaveToken } = useAuth();

  useEffect(() => {
    (async () => fetchAndSaveToken(state))();
  }, []);

  return <div>moi</div>;
};
