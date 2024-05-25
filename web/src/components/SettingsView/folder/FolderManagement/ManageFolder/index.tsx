import { createState, useState } from "@hookstate/core";
import { Button, Stack } from "@mui/material";
import useAuthenticatedMutation from "../../../../../auth/useAuthenticatedMutation";
import {
  AddFolderRoleDocument,
  Character,
  FolderRoles,
} from "../../../../../generated/graphqlOperations";
import Select from "../../../../controls/Select";
import useNotification from "../../../../GlobalNotification/useNotification";
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
  const { selectedFolder, selectedRole, selectedCharacter } =
    useState(manageFolderState);
  const { manageableFolders } = useSettingsData();
  const [addFolderRoleMutation] = useAuthenticatedMutation(
    AddFolderRoleDocument,
  );
  const { showSuccessNotification } = useNotification();

  const folderOptions = manageableFolders.map(({ id, name }) => ({
    id,
    value: id,
    label: name,
  }));
  const roleOptions = Object.keys(FolderRoles).map((role) => ({
    id: `role-${role}`,
    value: FolderRoles[role as keyof typeof FolderRoles],
    label: role,
  }));

  const onSubmit = async () => {
    await addFolderRoleMutation({
      variables: {
        input: {
          userEsiId: selectedCharacter.value?.esiId,
          folderId: selectedFolder.value,
          role: selectedRole.value,
        },
      },
    });
    showSuccessNotification("Role added.");
  };

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
      <Button color="secondary" variant="contained" onClick={onSubmit}>
        Add Role
      </Button>
    </Stack>
  );
};

export default ManageFolder;
