import { useQuery } from "@apollo/client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FindAccessibleFoldersDocument } from "../../../generated/graphqlOperations";
import SettingsDialog from "../SettingsDialog";

const FolderSettings = () => {
  const { data } = useQuery(FindAccessibleFoldersDocument);

  const handleChange = (event: SelectChangeEvent) => {};

  return (
    <SettingsDialog title="Folder Options">
      <FormControl fullWidth sx={{ minWidth: 300 }}>
        <InputLabel id="active-folder-select">Active Folder</InputLabel>
        <Select
          labelId="active-folder-select"
          label="Active Folder"
          onChange={handleChange}
          defaultValue=""
        >
          {data?.findAccessibleFolders.map((folder) => (
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
