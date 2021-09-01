import { Paper } from "@material-ui/core";
import Tree from "react-d3-tree";
import useSystemData from "../SystemData/useSystemData";

export default () => {
  const { mapTree, name } = useSystemData();
  const data = { name, children: mapTree };

  return (
    <Paper>
      <Tree data={data} orientation="vertical" />
    </Paper>
  );
};
