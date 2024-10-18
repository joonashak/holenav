import { useQuery } from "@apollo/client";
import { FindConnectionGraphDocument } from "../../../../generated/graphqlOperations";
import useCurrentSystemName from "../../useCurrentSystemName";

const useMapData = () => {
  const root = useCurrentSystemName();
  const { data } = useQuery(FindConnectionGraphDocument, {
    variables: { root },
  });
  console.log(data);
};

export default useMapData;
