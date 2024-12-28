import wormholes from "@eve-data/wormholes";
import { MassStatus } from "../../../../generated/graphqlOperations";
import { MapLinkDatum } from "../connection-data/types";
import MapLinkClasses from "./MapLinkClasses.enum";

const getWhSizeClass = (type: string, reverseType: string): MapLinkClasses => {
  const realType = type !== "K162" ? type : reverseType;

  if (!realType) {
    return MapLinkClasses.UNKNOWN_SIZE;
  }

  const whSize = wormholes.find((wh) => wh.type === realType)?.mass.jump || 0;

  if (whSize > 300000000) {
    return MapLinkClasses.XLARGE;
  }
  if (whSize > 62000000) {
    return MapLinkClasses.LARGE;
  }
  if (whSize > 5000000) {
    return MapLinkClasses.MEDIUM;
  }
  if (whSize > 0) {
    return MapLinkClasses.SMALL;
  }

  return MapLinkClasses.UNKNOWN_SIZE;
};

/**
 * Create dynamic CSS class name string according to wormhole properties. For
 * use with react-d3-tree.
 */
const pathClassFunc = (link: MapLinkDatum) => {
  const { wormhole } = link.target.data;

  if (!wormhole) {
    return "";
  }
  const { eol, massStatus, wormholeType, reverseType } = wormhole;
  const classes = [MapLinkClasses.DEFAULT];

  if (eol) {
    classes.push(MapLinkClasses.EOL);
  }

  if (massStatus === MassStatus.Destab) {
    classes.push(MapLinkClasses.DESTAB);
  } else if (massStatus === MassStatus.Crit) {
    classes.push(MapLinkClasses.CRIT);
  }

  classes.push(getWhSizeClass(wormholeType || "", reverseType || ""));

  return classes.join(" ");
};

export default pathClassFunc;
