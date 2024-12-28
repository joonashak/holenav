import { useQuery } from "@apollo/client";
import { GetMyUserPreferencesDocument } from "../generated/graphql-operations";

const useActiveFolder = () => {
  const { data } = useQuery(GetMyUserPreferencesDocument);

  return {
    activeFolderId: data?.getMyUserPreferences.activeFolder?.id || "",
  };
};

export default useActiveFolder;
