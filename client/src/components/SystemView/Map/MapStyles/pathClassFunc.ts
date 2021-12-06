import { MapLinkDatum } from "../MapData/types";

const pathClassFunc = (node: MapLinkDatum) => {
  const classes = ["custom-link"];

  if (node.target.data.eol) {
    classes.push("path-eol");
  }

  return classes.join(" ");
};

export default pathClassFunc;
