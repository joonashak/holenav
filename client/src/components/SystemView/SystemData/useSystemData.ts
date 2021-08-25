import { useContext } from "react";
import { SystemDataContext } from ".";
import SecurityClasses from "../../../enum/SecurityClasses";

type SystemData = {
  name: string;
  securityClass: SecurityClasses;
  securityStatus: number;
  whClass: number | null;
};

export default (): SystemData => {
  const [state] = useContext<any>(SystemDataContext);
  return state;
};
