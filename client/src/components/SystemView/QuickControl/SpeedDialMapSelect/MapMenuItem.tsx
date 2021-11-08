import { SyntheticEvent } from "react";
import { IconButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { SavedMap } from "../../../UserData/types";
import useUserData from "../../../UserData/useUserData";
import useNotification from "../../../GlobalNotification/useNotification";

type MapMenuItemProps = {
  map: SavedMap;
  selectMap: (mapId: string) => void;
};

const MapMenuItem = ({ map, selectMap }: MapMenuItemProps) => {
  const { setNotification } = useNotification();
  const { id, name } = map;
  const {
    deleteSavedMap,
    settings: { selectedMap },
  } = useUserData();

  const selected = map.id === selectedMap.id;

  const removeSavedMap = async (event: SyntheticEvent) => {
    event.stopPropagation();
    const res = await deleteSavedMap(map.id);

    if (!res.errors) {
      setNotification("Map removed.", "success", true);
    }
  };

  return (
    <MenuItem onClick={() => selectMap(id)}>
      <ListItemIcon>{selected ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>
      <ListItemText sx={{ marginRight: 2 }}>{name}</ListItemText>
      <IconButton onClick={removeSavedMap}>
        <DeleteIcon />
      </IconButton>
    </MenuItem>
  );
};

export default MapMenuItem;
