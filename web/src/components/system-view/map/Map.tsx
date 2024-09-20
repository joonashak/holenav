import { Box } from "@mui/material";
import Tree, { RawNodeDatum } from "react-d3-tree";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import MapNode from "./map-node/MapNode";
import MapStyles from "./map-styles/MapStyles";
import pathClassFunc from "./map-styles/pathClassFunc";

// Avoid rerendering map style definitions.
const inputMapStyles = <MapStyles />;

// Hack to enable hooks in MapNode...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Node = (props: any) => <MapNode {...props} />;

const Map = () => {
  const { width } = useWindowDimensions();
  // const { connectionTree } = useMapData();
  // const { rootSystemName, children: rootChildren } = connectionTree;
  const rootSystemName = "";
  const rootChildren: RawNodeDatum[] = [];

  if (!rootSystemName) {
    return null;
  }

  const compareMapNodes = (a: RawNodeDatum, b: RawNodeDatum) =>
    a.name.localeCompare(b.name);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
