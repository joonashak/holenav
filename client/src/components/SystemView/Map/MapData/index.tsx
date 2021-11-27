import { createState } from "@hookstate/core";
import { ReactElement, useEffect } from "react";
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

  useEffect(() => {
    fetchConnectionTree();
  }, [wormholes]);

  /*
  // FIXME: Handle loading and errors properly.
  if (loading || error) {
    return null;
  }
  */

  return children;
};

export default MapData;
