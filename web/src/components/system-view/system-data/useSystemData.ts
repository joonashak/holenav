import { findOneSystem, System, WormholeEffect } from "@eve-data/systems";
import { create } from "zustand";
import SecurityClasses from "../../../enum/SecurityClasses";

type SystemData = {
  eveId: number;
  name: string;
  securityClass: SecurityClasses;
  securityStatus: number;
  whClass: number | null;
  effect: WormholeEffect | null;
  region: System["region"];
  constellation: System["constellation"];
  staticConnections: System["staticConnections"];
};

type SystemDataActions = {
  changeSystem: (name: string) => void;
};

const { id, ...data } = findOneSystem({ name: "Jita" });
const defaultSystem = {
  ...data,
  eveId: id,
  securityClass: data.securityClass as SecurityClasses,
};

const useSystemData = create<SystemData & SystemDataActions>((set) => ({
  ...defaultSystem,
  changeSystem: (name) => {
    const { id, ...data } = findOneSystem({ name });
    set({
      ...data,
      eveId: id,
      securityClass: data.securityClass as SecurityClasses,
    });
  },
}));

export default useSystemData;
