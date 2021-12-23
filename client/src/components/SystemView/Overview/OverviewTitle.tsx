import { Typography } from "@mui/material";
import useSystemData from "../SystemData/useSystemData";
import useMapData from "../Map/MapData/useMapData";
import useUserData from "../../UserData/useUserData";
import { flattenConnectionTreeChildren } from "../Map/MapData/utils";

const OverviewTitle = () => {
  const { name } = useSystemData();
  const { connectionTree } = useMapData();
  const { settings } = useUserData();
  const { selectedMap } = settings;

  const connections = flattenConnectionTreeChildren(connectionTree.children);

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
    <Typography variant="h6">
      {name}
      {bookmarkNameInTitle}
    </Typography>
  );
};

export default OverviewTitle;
