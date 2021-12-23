import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { flatMapDeep } from "lodash";
import SystemInfo from "./SystemInfo";
import ScanningPanel from "./ScanningPanel";
import IntelPanel from "./IntelPanel";
import useSystemData from "../SystemData/useSystemData";
import OverviewMenu from "./OverviewMenu";
import useMapData from "../Map/MapData/useMapData";
import useUserData from "../../UserData/useUserData";
import { MapNodeDatum } from "../Map/MapData/types";

export default () => {
  const { name } = useSystemData();
  const { connectionTree } = useMapData();
  const { settings } = useUserData();
  const { selectedMap } = settings;
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const getChildren = (node: MapNodeDatum): any => {
    if (!node.children || !node.children.length) {
      return node;
    }
    return [node, flatMapDeep(node.children, getChildren)];
  };
  const connections = flatMapDeep(
    connectionTree.children,
    getChildren
  ) as unknown as MapNodeDatum[];
  const systemFromConnectionTree = connections.find(
    (conn) => conn.wormhole?.destinationName === name
  );
  const nameFromConnectionTree = systemFromConnectionTree
    ? systemFromConnectionTree.wormhole?.name
    : null;
  const bookmarkName =
    name === selectedMap.rootSystemName ? selectedMap.name : nameFromConnectionTree;
  const bookmarkNameInTitle = bookmarkName ? ` - ${bookmarkName}` : null;

  return (
    <Box
      sx={{
        zIndex: 1,
        height: "fit-content",
        width: {
          xs: "100vw",
          sm: "30rem",
        },
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="Open Menu" onClick={toggleMenu} size="large">
            <MenuIcon />
          </IconButton>
          <OverviewMenu open={menuOpen} toggle={toggleMenu} />
          <Typography variant="h6">
            {name}
            {bookmarkNameInTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <SystemInfo />
      <ScanningPanel />
      <IntelPanel />
    </Box>
  );
};
