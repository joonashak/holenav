import { useContext } from "react";
import { UserDataContext, UserDataState } from ".";

export default (): UserDataState => {
  const [state] = useContext<any>(UserDataContext);

  return {
    ...state,
  };
};
