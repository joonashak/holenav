import { FetchResult, useMutation } from "@apollo/client";
import { useContext } from "react";
import { SystemDataContext } from ".";
import MassStatus from "../../../enum/MassStatus";
import SecurityClasses from "../../../enum/SecurityClasses";
import { ADD_SIGNATURE, ADD_WORMHOLE, EDIT_WORMHOLE } from "./graphql";

type SystemData = {
  id: string;
  name: string;
  securityClass: SecurityClasses;
  securityStatus: number;
  whClass: number | null;
  signatures: Signature[];
  wormholes: Wormhole[];
  addSignature: (newSig: any) => Promise<FetchResult>;
  addWormhole: (newWormhole: any) => Promise<FetchResult>;
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
  reverse?: Wormhole;
  massStatus: MassStatus;
};

export default (): SystemData => {
  const [state, setState] = useContext<any>(SystemDataContext);
  const [addSigMutation] = useMutation(ADD_SIGNATURE);
  const [addWhMutation] = useMutation(ADD_WORMHOLE);
  const [updateWhMutation] = useMutation(EDIT_WORMHOLE);

  const addSignature = async (newSig: any) => {
    const input = { ...newSig, systemId: state.id };
    const res = await addSigMutation({ variables: { input } });
    const { data, errors } = res;
    console.log(res);

    if (data && !errors) {
      setState(({ signatures, ...rest }: SystemData) => ({
        ...rest,
        signatures: signatures.concat(data.addSignature),
      }));
    }

    return res;
  };

  const addWormhole = async (newWormhole: any): Promise<FetchResult> => {
    const res = await addWhMutation({ variables: { input: newWormhole } });
    const { data, errors } = res;

    if (data && !errors) {
      setState(({ wormholes, ...rest }: SystemData) => ({
        ...rest,
        wormholes: wormholes.concat(data.addWormhole),
      }));
    }

    return res;
  };

  const updateWormhole = async (update: Wormhole): Promise<FetchResult> => {
    const res = await updateWhMutation({ variables: { input: update } });
    const { data, errors } = res;

    if (data && !errors) {
      const updatedWh = data.updateWormhole;
      setState(({ wormholes, ...rest }: SystemData) => ({
        ...rest,
        wormholes: wormholes.map((wh) => (wh.id === updatedWh.id ? updatedWh : wh)),
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
