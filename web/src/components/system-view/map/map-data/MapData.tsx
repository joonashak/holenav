import { createState } from "@hookstate/core";
import { ReactElement, useEffect } from "react";
import { devToolsEnabled, pollIntervalSec } from "../../../../config";
import useLocalData from "../../../local-data/useLocalData";
import useSignatures from "../../system-data/useSignatures";
import { MapState } from "./types";
import useMapData from "./useMapData";

export const mapState = createState<MapState>({
  connectionTree: { rootSystemName: null, children: [] },
});

interface MapDataProviderProps {
  children: ReactElement;
}

const MapData = ({ children }: MapDataProviderProps) => {
  const { fetchConnectionTree } = useMapData();
  const { signatures } = useSignatures();
  const { pollSetting } = useLocalData();

  useEffect(() => {
    fetchConnectionTree();
  }, [signatures]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!devToolsEnabled || pollSetting) {
        fetchConnectionTree();
      }
    }, pollIntervalSec * 1000);
    return () => clearInterval(interval);
  }, [pollSetting]);

  return children;
};

export default MapData;
