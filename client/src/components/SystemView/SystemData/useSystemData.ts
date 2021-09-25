import { useContext } from "react";
import { SystemDataContext } from ".";
import SecurityClasses from "../../../enum/SecurityClasses";

type SystemData = {
  id: string;
  name: string;
  securityClass: SecurityClasses;
  securityStatus: number;
  whClass: number | null;
  signatures: Signature[];
  addSignature: (newSig: any) => void;
};

type Signature = {
  id: string;
  eveId: string;
  name: string;
  type: string;
};

export default (): SystemData => {
  const [state, setState] = useContext<any>(SystemDataContext);

  const addSignature = (newSig: any) =>
    setState(({ signatures, ...rest }: SystemData) => ({
      ...rest,
      signatures: signatures.concat(newSig),
    }));

  return {
    ...state,
    addSignature,
  };
};
