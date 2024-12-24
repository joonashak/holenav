import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { To, useNavigate } from "react-router-dom";

const SettingsMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const linkTo = (to: To) => () => {
    navigate(to);
    closeMenu();
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="Open Settings Menu">
        <SettingsIcon sx={{ width: "auto", height: 70 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem onClick={linkTo("folder-options")}>Folder Options</MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
