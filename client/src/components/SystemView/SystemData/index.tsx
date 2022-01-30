import { findOneSystem } from "@eve-data/systems";
import { createState, useState } from "@hookstate/core";
import { useEffect, ReactElement } from "react";
import SecurityClasses from "../../../enum/SecurityClasses";
import { SystemState } from "./types";

export const systemState = createState<SystemState>({
  id: "",
  eveId: 0,
  name: "",
  securityClass: SecurityClasses.High,
  securityStatus: 1,
  whClass: null,
  effect: null,
  signatures: [],
  wormholes: [],
});

type SystemDataProviderProps = {
  children: ReactElement;
};

const SystemData = ({ children }: SystemDataProviderProps) => {
  const state = useState(systemState);
  const { name } = state.get();

  // Static data.
  useEffect(() => {
    if (!name) {
      return;
    }

    const { id, ...system } = findOneSystem({ name });
    const securityClass = system.securityClass as SecurityClasses;
    state.merge({ ...system, securityClass, eveId: id });
  }, [name]);

  return children;
};

export default SystemData;
