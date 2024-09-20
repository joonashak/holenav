import { useQuery } from "@apollo/client";
import { useLocalStorage } from "usehooks-ts";
import { FindMapsDocument } from "../generated/graphqlOperations";

const useSelectedMap = () => {
  const [selectedMapId, setSelectedMapId] = useLocalStorage<string | undefined>(
    "holenav-selected-map",
    undefined,
  );

  const { data } = useQuery(FindMapsDocument);
  const maps = data?.findMaps || [];
  const selectedMap = maps.find((map) => map.id === selectedMapId);

  return {
    selectedMap,
    setSelectedMapId,
    maps,
  };
};

export default useSelectedMap;
