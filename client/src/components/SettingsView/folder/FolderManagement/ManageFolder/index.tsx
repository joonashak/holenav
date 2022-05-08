import { createState, useState } from "@hookstate/core";
import { Character } from "../../../../../generated/graphqlOperations";
import Select from "../../../../controls/Select";
import useSettingsData from "../../../SettingsData/useSettingsData";
import CharacterSearch from "./CharacterSearch";

type ManageFolderState = {
  selectedFolder: string;
  selectedCharacter: Character | null;
};

export const manageFolderState = createState<ManageFolderState>({
  selectedFolder: "",
  selectedCharacter: null,
});

const ManageFolder = () => {
  const { selectedFolder } = useState(manageFolderState);
  const { manageableFolders } = useSettingsData();
  const folderOptions = manageableFolders.map(({ id, name }) => ({ id, value: id, label: name }));

  return (
    <>
      <Select
        options={folderOptions}
        onChange={(event) => selectedFolder.set(event.target.value)}
        title="Select Folder"
        value={selectedFolder.value}
      />
      <CharacterSearch />
    </>
  );
};

export default ManageFolder;
