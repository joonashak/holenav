import { useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { FindMapsDocument } from "../generated/graphql-operations";

const useSelectedMap = () => {
  const [selectedMapId, setSelectedMapId] = useLocalStorage<string | undefined>(
    "holenav-selected-map",
    undefined,
  );

  const { data } = useQuery(FindMapsDocument);
  const maps = useMemo(() => data?.findMaps || [], [data]);
  const selectedMap = maps.find((map) => map.id === selectedMapId);

  // Select first map automatically if a map is not selected or the selected map doesn't exist.
  useEffect(() => {
    if (!maps.length) {
      return;
    }

    const mapIds = maps.map((m) => m.id);

    if (!selectedMapId || !mapIds.includes(selectedMapId)) {
      setSelectedMapId(mapIds[0]);
    }
  }, [maps, selectedMapId, setSelectedMapId]);

  return {
    selectedMap,
    setSelectedMapId,
    maps,
  };
};

export default useSelectedMap;
