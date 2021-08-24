import { useContext } from "react";
import { SystemDataContext } from ".";

export default () => {
  const [state] = useContext<any>(SystemDataContext);
  return state;
};
