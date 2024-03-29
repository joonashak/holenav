import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { SyntheticEvent } from "react";
import { SavedMap } from "../../../../generated/graphqlOperations";
import useNotification from "../../../GlobalNotification/useNotification";
import useUserData from "../../../UserData/useUserData";

type MapMenuItemProps = {
  map: SavedMap;
  selectMap: (map: SavedMap) => void;
};

const MapMenuItem = ({ map, selectMap }: MapMenuItemProps) => {
  const { showSuccessNotification } = useNotification();
  const { name } = map;
  const {
    deleteSavedMap,
    settings: { selectedMap },
  } = useUserData();

  const selected = map.id === selectedMap?.id;

  const removeSavedMap = async (event: SyntheticEvent) => {
    event.stopPropagation();
    const res = await deleteSavedMap(map.id);

    if (!res.errors) {
      showSuccessNotification("Map removed.");
    }
  };

  return (
    <MenuItem onClick={() => selectMap(map)}>
      <ListItemIcon>
        {selected ? <CheckIcon sx={{ color: "secondary.light" }} /> : null}
      </ListItemIcon>
      <ListItemText
        sx={{ marginRight: 2, color: selected ? "secondary.light" : "primary.contrastText" }}
      >
        {name}
      </ListItemText>
      <IconButton onClick={removeSavedMap} size="small">
        <DeleteIcon />
      </IconButton>
    </MenuItem>
  );
};

export default MapMenuItem;
