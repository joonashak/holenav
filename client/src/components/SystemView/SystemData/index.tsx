import { useQuery } from "@apollo/client";
import { findOneSystem } from "@eve-data/systems";
import { createState, useState } from "@hookstate/core";
import { useEffect, ReactElement } from "react";
import SecurityClasses from "../../../enum/SecurityClasses";
import { GET_SYSTEM_BY_NAME } from "./graphql";
import { SystemState } from "./types";

export const systemState = createState<SystemState>({
  id: "",
  name: "",
  securityClass: SecurityClasses.High,
  securityStatus: 1,
  whClass: null,
  signatures: [],
  wormholes: [],
});

type SystemDataProviderProps = {
  children: ReactElement;
  name: string;
};

const SystemData = ({ children, name }: SystemDataProviderProps) => {
  const state = useState(systemState);

  // Static data.
  useEffect(() => {
    const { id, ...system } = findOneSystem({ name });
    const securityClass = system.securityClass as SecurityClasses;
    state.merge({ ...system, securityClass });
  }, [name]);

  // System data from API.
  const { loading, error } = useQuery(GET_SYSTEM_BY_NAME, {
    variables: { name },
    onCompleted: ({ getSystemByName, getWormholesBySystem }) => {
      const { id, signatures } = getSystemByName;
      const wormholes = getWormholesBySystem;
      state.merge({ id, signatures, wormholes });
    },
  });

  // FIXME: Handle loading and errors properly.
  if (loading || error) {
    return null;
  }

  return children;
};

export default SystemData;
