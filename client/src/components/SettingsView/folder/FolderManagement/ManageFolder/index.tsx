import { createState, useState } from "@hookstate/core";
import { Stack } from "@mui/material";
import { Character, FolderRoles } from "../../../../../generated/graphqlOperations";
import Select from "../../../../controls/Select";
import useSettingsData from "../../../SettingsData/useSettingsData";
import CharacterSearch from "./CharacterSearch";

type ManageFolderState = {
  selectedFolder: string;
  selectedCharacter: Character | null;
  selectedRole: string;
};

export const manageFolderState = createState<ManageFolderState>({
  selectedFolder: "",
  selectedCharacter: null,
  selectedRole: "",
});

const ManageFolder = () => {
  const { selectedFolder, selectedRole } = useState(manageFolderState);
  const { manageableFolders } = useSettingsData();
  const folderOptions = manageableFolders.map(({ id, name }) => ({ id, value: id, label: name }));
  const roleOptions = Object.keys(FolderRoles).map((role) => ({
    id: `role-${role}`,
    value: role,
    label: role,
  }));

  return (
    <Stack spacing={2}>
      <Select
        options={folderOptions}
        onChange={(event) => selectedFolder.set(event.target.value)}
        title="Select Folder"
        value={selectedFolder.value}
      />
      <CharacterSearch />
      <Select
        options={roleOptions}
        onChange={(event) => selectedRole.set(event.target.value)}
        title="Select Role"
        value={selectedRole.value}
      />
    </Stack>
  );
};

export default ManageFolder;
