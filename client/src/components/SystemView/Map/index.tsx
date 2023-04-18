import { Box } from "@mui/material";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/types/common.d";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import useMapData from "./MapData/useMapData";
import MapNode from "./MapNode";
import MapStyles from "./MapStyles";
import pathClassFunc from "./MapStyles/pathClassFunc";

// Avoid rerendering map style definitions.
const inputMapStyles = <MapStyles />;

// Hack to enable hooks in MapNode...
const Node = (props: any) => <MapNode {...props} />;

const Map = () => {
  const { width } = useWindowDimensions();
  const { connectionTree } = useMapData();
  const { rootSystemName, children: rootChildren } = connectionTree;

  if (!rootSystemName) {
    return null;
  }

  const compareMapNodes = (a: RawNodeDatum, b: RawNodeDatum) => a.name.localeCompare(b.name);

  const orderChildren = (children: RawNodeDatum[]): any[] =>
    children
      .map(({ children: subChildren, ...rest }) => ({
        ...rest,
        children: orderChildren(subChildren || []),
      }))
      .sort(compareMapNodes);

  const data = { name: rootSystemName, children: orderChildren(rootChildren) };

  const x = width / 2 + 240;

  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      {inputMapStyles}
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={Node}
        translate={{ x, y: 100 }}
        pathClassFunc={pathClassFunc}
      />
    </Box>
  );
};

export default Map;
