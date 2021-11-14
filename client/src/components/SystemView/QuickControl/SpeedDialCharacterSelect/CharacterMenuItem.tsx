import { SyntheticEvent } from "react";
import { IconButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { Character } from "../../../UserData/types";
import useUserData from "../../../UserData/useUserData";
import useNotification from "../../../GlobalNotification/useNotification";
import useLocalData from "../../../LocalData/useLocalData";

type CharacterMenuItemProps = {
  character: Character;
  selectCharacter: () => void;
};

const CharacterMenuItem = ({ character, selectCharacter }: CharacterMenuItemProps) => {
  const { setNotification } = useNotification();
  const { activeCharacter, setActiveCharacter } = useLocalData();
  const { main, removeAlt } = useUserData();
  const { name, esiId } = character;
  const selected = activeCharacter === esiId;
  const isMain = esiId === main.esiId;

  const remove = async (event: SyntheticEvent) => {
    event.stopPropagation();

    if (selected) {
      setActiveCharacter(main.esiId);
    }

    const res = await removeAlt(esiId);
    if (!res.errors) {
      setNotification("Character removed.", "success", true);
    }
  };

  return (
    <MenuItem onClick={selectCharacter}>
      <ListItemIcon>
        {selected ? <CheckIcon sx={{ color: "secondary.light" }} /> : null}
      </ListItemIcon>
      <ListItemText
        sx={{ marginRight: 2, color: selected ? "secondary.light" : "primary.contrastText" }}
      >
        {name}
      </ListItemText>
      {!isMain && (
        <IconButton size="small" onClick={remove}>
          <DeleteIcon />
        </IconButton>
      )}
    </MenuItem>
  );
};

export default CharacterMenuItem;
