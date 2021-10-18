import { Box } from "@mui/material";
import Tree from "react-d3-tree";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import useMapData from "./MapData/useMapData";
import MapNode from "./MapNode";

export default () => {
  const {
    connectionTree: { rootSystemName, children },
  } = useMapData();
  const data = { name: rootSystemName, children };

  const { width } = useWindowDimensions();
  const x = width / 2 + 240;

  // FIXME: Hack to enable hooks in MapNode...
  // eslint-disable-next-line
  const Node = (props: CustomNodeElementProps) => <MapNode {...props} />;

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
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={Node}
        translate={{ x, y: 100 }}
      />
    </Box>
  );
};
