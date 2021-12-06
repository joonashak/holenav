import { MapLinkDatum } from "../MapData/types";
import MapLinkClasses from "./MapLinkClasses.enum";

const pathClassFunc = (node: MapLinkDatum) => {
  const classes = [MapLinkClasses.DEFAULT];

  if (node.target.data.eol) {
    classes.push(MapLinkClasses.EOL);
  }

  return classes.join(" ");
};

export default pathClassFunc;
