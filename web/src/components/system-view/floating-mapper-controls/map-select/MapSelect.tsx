import { useMutation } from "@apollo/client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FindMapsDocument,
  RemoveMapDocument,
} from "../../../../generated/graphqlOperations";
import useSelectedMap from "../../../../hooks/useSelectedMap";
import ConfirmButton from "../../../common/ConfirmButton";

const MapSelect = () => {
  const navigate = useNavigate();
  const { selectedMap, setSelectedMapId, maps } = useSelectedMap();

  const [removeMap] = useMutation(RemoveMapDocument, {
    refetchQueries: [FindMapsDocument],
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const selectMap = (id: string) => {
    setSelectedMapId(id);
    closeMenu();
  };

  const openNewMapDialog = () => {
    navigate("new-map");
  };

  const handleRemove = (id: string) => async () => {
    await removeMap({ variables: { id } });
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        aria-label="Select active map"
      >
        {selectedMap?.name || "Map not selected"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        onClose={closeMenu}
        aria-label="Map list"
      >
        {maps.map((map) => (
          <MenuItem
            key={map.id}
            onClick={() => selectMap(map.id)}
            selected={map.id === selectedMap?.id}
            sx={{
              "&.Mui-selected": { bgcolor: "primary.main" },
            }}
          >
            <ListItemText sx={{ pr: 3 }}>
              <Box>{map.name}</Box>
              <Typography
                variant="overline"
                sx={{ lineHeight: 0, textTransform: "none", color: grey[600] }}
              >
                {map.rootSystemName}
              </Typography>
            </ListItemText>
            <IconButton
              color="secondary"
              aria-label={`Edit map "${map.name}"`}
              onClick={(event) => {
                event.stopPropagation();
                navigate("edit-map", { state: { map } });
              }}
            >
              <EditIcon />
            </IconButton>
            <ConfirmButton
              icon={<DeleteIcon />}
              onConfirm={handleRemove(map.id)}
              aria-label={`Delete map "${map.name}"`}
            />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={openNewMapDialog}>
          <ListItemText sx={{ pr: 3 }}>New Map</ListItemText>
          <AddOutlinedIcon />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MapSelect;
