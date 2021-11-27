import { createState } from "@hookstate/core";
import { ReactElement, useEffect } from "react";
import { devToolsEnabled, pollIntervalSec } from "../../../../config";
import useLocalData from "../../../LocalData/useLocalData";
import useSystemData from "../../SystemData/useSystemData";
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
  const { wormholes } = useSystemData();
  const { pollSetting } = useLocalData();

  useEffect(() => {
    fetchConnectionTree();
  }, [wormholes]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!devToolsEnabled || pollSetting) {
        fetchConnectionTree();
      }
    }, pollIntervalSec * 1000);
    return () => clearInterval(interval);
  }, [pollSetting]);

  /*
  // FIXME: Handle loading and errors properly.
  if (loading || error) {
    return null;
  }
  */

  return children;
};

export default MapData;
