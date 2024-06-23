import { useLocalStorage } from "usehooks-ts";

const useSelectedFolder = () => {
  const [selectedFolderId, setSelectedFolderId] = useLocalStorage<string>(
    "holenav-selected-folder-id",
    "",
  );
  return { selectedFolderId, setSelectedFolderId };
};

export default useSelectedFolder;
