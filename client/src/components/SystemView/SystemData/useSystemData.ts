import { FetchResult, useMutation } from "@apollo/client";
import { useContext } from "react";
import { SystemDataContext } from ".";
import MassStatus from "../../../enum/MassStatus";
import SecurityClasses from "../../../enum/SecurityClasses";
import {
  ADD_SIGNATURE,
  ADD_WORMHOLE,
  DELETE_SIGNATURE,
  EDIT_SIGNATURE,
  EDIT_WORMHOLE,
} from "./graphql";

type SystemData = {
  id: string;
  name: string;
  securityClass: SecurityClasses;
  securityStatus: number;
  whClass: number | null;
  signatures: Signature[];
  wormholes: Wormhole[];
  addSignature: (newSig: any) => Promise<FetchResult>;
  updateSignature: (update: Signature) => Promise<FetchResult>;
  deleteSignature: (id: string) => Promise<void>;
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
  const [updateSigMutation] = useMutation(EDIT_SIGNATURE);
  const [deleteSigMutation] = useMutation(DELETE_SIGNATURE);
  const [addWhMutation] = useMutation(ADD_WORMHOLE);
  const [updateWhMutation] = useMutation(EDIT_WORMHOLE);

  const addSignature = async (newSig: any) => {
    const input = { ...newSig, systemId: state.id };
    const res = await addSigMutation({ variables: { input } });
    const { data, errors } = res;

    if (data && !errors) {
      setState(({ signatures, ...rest }: SystemData) => ({
        ...rest,
        signatures: signatures.concat(data.addSignature),
      }));
    }

    return res;
  };

  const updateSignature = async (update: Signature): Promise<FetchResult> => {
    const res = await updateSigMutation({ variables: { input: update } });
    const { data, errors } = res;

    if (data && !errors) {
      const updatedSig = data.updateSignature;
      setState(({ signatures, ...rest }: SystemData) => ({
        ...rest,
        signatures: signatures.map((sig) => (sig.id === updatedSig.id ? updatedSig : sig)),
      }));
    }

    return res;
  };

  const deleteSignature = async (id: string): Promise<void> => {
    const res = await deleteSigMutation({ variables: { id } });
    const { data, errors } = res;

    if (data && !errors) {
      const deletedSig = data.deleteSignature;
      setState(({ signatures, ...rest }: SystemData) => ({
        ...rest,
        signatures: signatures.filter((sig) => sig.id !== deletedSig.id),
      }));
    }
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
    updateSignature,
    deleteSignature,
    addWormhole,
    updateWormhole,
  };
};
