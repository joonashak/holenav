import { useContext } from "react";
import { SystemDataContext } from ".";
import SecurityClasses from "../../../enum/SecurityClasses";

type SystemData = {
  name: string;
  securityClass: SecurityClasses;
  securityStatus: number;
  whClass: number | null;
  signatures: Signature[];
};

type Signature = {
  id: string;
  eveId: string;
  name: string;
  type: string;
};

export default (): SystemData => {
  const [state] = useContext<any>(SystemDataContext);
  return state;
};
