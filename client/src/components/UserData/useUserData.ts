import { useContext } from "react";
import { UserDataContext } from ".";
import { UserData } from "./userData.types";

export default (): UserData => {
  const [state] = useContext<any>(UserDataContext);

  return {
    ...state,
  };
};
