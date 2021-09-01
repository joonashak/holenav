import { makeStyles, Theme } from "@material-ui/core";
import Tree from "react-d3-tree";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import useSystemData from "../SystemData/useSystemData";
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
}));

export default () => {
  const classes = useStyles();
  const { mapTree, name } = useSystemData();
  const data = { name, children: mapTree };

  const { width } = useWindowDimensions();
  const x = width / 2 + 240;

  return (
    <div className={classes.container}>
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={MapNode}
        translate={{ x, y: 100 }}
      />
    </div>
  );
};
