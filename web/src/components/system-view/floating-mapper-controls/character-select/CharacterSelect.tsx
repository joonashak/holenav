import { useQuery } from "@apollo/client";
import { Button, Menu, MenuItem } from "@mui/material";
import { sortBy } from "lodash";
import { useState } from "react";
import { GetMyUserPreferencesDocument } from "../../../../generated/graphqlOperations";

const CharacterSelect = () => {
  const { data } = useQuery(GetMyUserPreferencesDocument);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!data) {
    return null;
  }

  const altsSorted = sortBy(data.getMyUserPreferences.user.alts, "name");
  const characters = [data.getMyUserPreferences.user.main].concat(altsSorted);

  return (
    <>
      <Button onClick={handleClick}>Selecter Character</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {characters.map((char) => (
          <MenuItem key={char.eveId} onClick={handleClose}>
            {char.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CharacterSelect;
