import { Box } from "@mui/material";
import Tree from "react-d3-tree";
import useConnectionData from "../../../hooks/useConnectionData";
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
  const { connectionTree } = useConnectionData();

  const x = width / 2 + 240;

  return (
    <Box
      aria-label="Connection tree"
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
        data={connectionTree}
        orientation="vertical"
        renderCustomNodeElement={Node}
        translate={{ x, y: 100 }}
        pathClassFunc={pathClassFunc}
      />
    </Box>
  );
};

export default Map;
