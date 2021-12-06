import { Box, GlobalStyles } from "@mui/material";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import useMapData from "./MapData/useMapData";
import MapNode from "./MapNode";

export default () => {
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

  // Hack to enable hooks in MapNode...
  const Node = (props: any) => <MapNode {...props} />;

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
      <GlobalStyles
        styles={(theme: any) => ({
          ".custom-link.custom-link": {
            stroke: theme.palette.secondary.light,
          },
        })}
      />
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={Node}
        translate={{ x, y: 100 }}
        pathClassFunc={() => "custom-link"}
      />
    </Box>
  );
};
