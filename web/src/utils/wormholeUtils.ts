import wormholes from "@eve-data/wormholes";
import { Connection } from "../generated/graphql-operations";

export const getWormholeProperties = (type: Connection["type"]) =>
  wormholes.find((wh) => wh.type === type);
