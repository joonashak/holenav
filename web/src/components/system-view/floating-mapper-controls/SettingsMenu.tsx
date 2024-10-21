import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const SettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <SettingsIcon sx={{ width: "auto", height: 70 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem>Folder Options</MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
