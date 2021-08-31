import { Paper } from "@material-ui/core";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";

const mockData: RawNodeDatum = {
  name: "Jita",
  children: [
    {
      name: "Ikuchi",
      children: [
        {
          name: "Ansila",
        },
      ],
    },
    { name: "Maurasi" },
  ],
};

export default () => {
  console.log("asd");

  return (
    <Paper>
      <Tree data={mockData} orientation="vertical" />
    </Paper>
  );
};
