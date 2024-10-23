import { useQuery } from "@apollo/client";
import { GetMyUserPreferencesDocument } from "../generated/graphqlOperations";

const useActiveFolder = () => {
  const { data } = useQuery(GetMyUserPreferencesDocument);

  return {
    activeFolderId: data?.getMyUserPreferences.activeFolder?.id || "",
  };
};

export default useActiveFolder;
