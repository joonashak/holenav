import { useQuery } from "@apollo/client";
import { Button, Menu, MenuItem } from "@mui/material";
import { sortBy } from "lodash";
import { useState } from "react";
import { GetMyUserPreferencesDocument } from "../../../../generated/graphqlOperations";
import useSelectedCharacter from "../../../../hooks/useSelectedCharacter";

const CharacterSelect = () => {
  const { data } = useQuery(GetMyUserPreferencesDocument);
  const { selectedCharacter, setSelectedCharacterEveId } =
    useSelectedCharacter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const selectCharacter = (id: number) => {
    setSelectedCharacterEveId(id);
    closeMenu();
  };

  if (!data || !selectedCharacter) {
    return null;
  }

  const altsSorted = sortBy(data.getMyUserPreferences.user.alts, "name");
  const characters = [data.getMyUserPreferences.user.main].concat(altsSorted);

  return (
    <>
      <Button onClick={handleClick}>{selectedCharacter.name}</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
        {characters.map((char) => (
          <MenuItem
            key={char.eveId}
            onClick={() => selectCharacter(char.eveId)}
          >
            {char.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CharacterSelect;
