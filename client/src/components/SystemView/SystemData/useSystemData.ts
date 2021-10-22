import { FetchResult, useMutation } from "@apollo/client";
import { useContext } from "react";
import { SystemDataContext } from ".";
import SecurityClasses from "../../../enum/SecurityClasses";
import { EDIT_WORMHOLE } from "./graphql";

type SystemData = {
  id: string;
  name: string;
  securityClass: SecurityClasses;
  securityStatus: number;
  whClass: number | null;
  signatures: Signature[];
  wormholes: Wormhole[];
  addSignature: (newSig: any) => void;
  addWormhole: (newWormhole: any) => void;
  updateWormhole: (update: Wormhole) => Promise<FetchResult>;
};

export type Signature = {
  id: string;
  eveId: string;
  name: string;
  type: string;
};

export type Wormhole = Signature & {
  eol: boolean;
  destinationName: string | null;
};

export default (): SystemData => {
  const [state, setState] = useContext<any>(SystemDataContext);
  const [updateWhMutation] = useMutation(EDIT_WORMHOLE);

  const addSignature = (newSig: any) =>
    setState(({ signatures, ...rest }: SystemData) => ({
      ...rest,
      signatures: signatures.concat(newSig),
    }));

  const addWormhole = (newWormhole: any) =>
    setState(({ wormholes, ...rest }: SystemData) => ({
      ...rest,
      wormholes: wormholes.concat(newWormhole),
    }));

  const updateWormhole = async (update: Wormhole): Promise<FetchResult> => {
    const { id, name, destinationName } = update;
    const res = await updateWhMutation({ variables: { input: { id, name, destinationName } } });
    const { data, errors } = res;

    if (data && !errors) {
      setState(({ wormholes, ...rest }: SystemData) => ({
        wormholes: wormholes.map((wh) => (wh.id === data.id ? data : wh)),
        ...rest,
      }));
    }

    return res;
  };

  return {
    ...state,
    addSignature,
    addWormhole,
    updateWormhole,
  };
};
