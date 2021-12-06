import MassStatus from "../../../../enum/MassStatus";
import { MapLinkDatum } from "../MapData/types";
import MapLinkClasses from "./MapLinkClasses.enum";

const pathClassFunc = (link: MapLinkDatum) => {
  const { eol, massStatus } = link.target.data;
  const classes = [MapLinkClasses.DEFAULT];

  if (eol) {
    classes.push(MapLinkClasses.EOL);
  }

  if (massStatus === MassStatus.DESTAB) {
    classes.push(MapLinkClasses.DESTAB);
  } else if (massStatus === MassStatus.CRIT) {
    classes.push(MapLinkClasses.CRIT);
  }

  return classes.join(" ");
};

export default pathClassFunc;
