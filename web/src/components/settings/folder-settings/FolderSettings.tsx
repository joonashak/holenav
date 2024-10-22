import { useMutation, useQuery } from "@apollo/client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  FindAccessibleFoldersDocument,
  GetMyUserPreferencesDocument,
  UpdateActiveFolderDocument,
} from "../../../generated/graphqlOperations";
import SettingsDialog from "../SettingsDialog";

const FolderSettings = () => {
  const { data: folderData } = useQuery(FindAccessibleFoldersDocument);
  const { data: prefsData } = useQuery(GetMyUserPreferencesDocument);
  const [updateActiveFolder] = useMutation(UpdateActiveFolderDocument, {
    refetchQueries: [GetMyUserPreferencesDocument],
  });

  const handleChange = async (event: SelectChangeEvent) => {
    await updateActiveFolder({ variables: { folderId: event.target.value } });
  };

  if (!folderData || !prefsData) {
    return null;
  }

  return (
    <SettingsDialog title="Folder Options">
      <FormControl fullWidth sx={{ minWidth: 300 }}>
        <InputLabel id="active-folder-select">Active Folder</InputLabel>
        <Select
          labelId="active-folder-select"
          label="Active Folder"
          onChange={handleChange}
          defaultValue={prefsData.getMyUserPreferences.activeFolder?.id || ""}
        >
          {folderData.findAccessibleFolders.map((folder) => (
            <MenuItem key={folder.id} value={folder.id}>
              {folder.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SettingsDialog>
  );
};

export default FolderSettings;
