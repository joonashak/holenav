import { useRef, useState } from "react";
import { Menu, MenuItem, SpeedDialAction, SpeedDialActionProps } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import useUserData from "../../UserData/useUserData";

// TODO: Highlight selected map.

const SpeedDialMapSelect = (props: SpeedDialActionProps) => {
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const {
    setSelectedMap,
    settings: { maps, selectedMap },
  } = useUserData();

  const selectMap = (mapId: string) => {
    setSelectedMap(mapId);
    toggleOpen();
  };

  return (
    <>
      <SpeedDialAction
        {...props}
        onClick={toggleOpen}
        icon={<MapIcon ref={anchorEl} />}
        tooltipTitle="Select Map"
      />
      <Menu open={open} anchorEl={anchorEl.current} onClose={toggleOpen}>
        {maps.map(({ id, name }) => (
          <MenuItem onClick={() => selectMap(id)} key={`quick-map-select-${id}`}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SpeedDialMapSelect;
