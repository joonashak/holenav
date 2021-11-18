import { useQuery } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import { ReactElement } from "react";
import useUserData from "../../../UserData/useUserData";
import { GET_CONNECTION_TREE } from "./graphql";
import { MapData as MapDataType } from "./types";

export const mapState = createState<MapDataType>({
  connectionTree: { rootSystemName: null, children: [] },
});

interface MapDataProviderProps {
  children: ReactElement;
}

const MapData = ({ children }: MapDataProviderProps) => {
  const state = useState(mapState);
  const { settings } = useUserData();
  const { selectedMap } = settings;

  const { loading, error } = useQuery(GET_CONNECTION_TREE, {
    variables: { rootSystem: selectedMap?.rootSystemName },
    onCompleted: (data) => state.merge({ connectionTree: data.getConnectionTree }),
  });

  // FIXME: Handle loading and errors properly.
  if (loading || error) {
    return null;
  }

  return children;
};

export default MapData;
