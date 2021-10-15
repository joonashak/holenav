import { makeStyles, Theme } from "@material-ui/core";
import Tree from "react-d3-tree";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import useMapData from "./MapData/useMapData";
import MapNode from "./MapNode";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },
  // Reset rd3t node styles so they can be styled in component code.
  nodeReset: {
    stroke: "none !important",
  },
}));

export default () => {
  const classes = useStyles();
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
    <div className={classes.container}>
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={Node}
        branchNodeClassName={classes.nodeReset}
        rootNodeClassName={classes.nodeReset}
        translate={{ x, y: 100 }}
      />
    </div>
  );
};
