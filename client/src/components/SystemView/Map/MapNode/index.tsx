import { findOneSystem } from "@eve-data/systems";
import { System } from "@eve-data/systems/lib/src/api/system.type";
import { Box, Typography } from "@mui/material";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";
import AppLink from "../../../common/AppLink";
import useUserData from "../../../UserData/useUserData";
import { MapNodeDatum } from "../MapData/types";
import MapNodeRect from "./MapNodeRect";
import WhTypeLabel from "./WhTypeLabel";

export type MapNodeProps = CustomNodeElementProps & {
  nodeDatum: MapNodeDatum;
};

const MapNode = ({ nodeDatum }: MapNodeProps) => {
  const { settings } = useUserData();
  const { wormhole } = nodeDatum;

  const name = wormhole?.name || "";
  const type = wormhole?.type || "";
  const destinationName = wormhole?.destinationName || "";

  const { selectedMap } = settings;
  const isRootNode = nodeDatum.__rd3t.depth === 0;

  let destination: System | null = null;

  try {
    destination = findOneSystem({ name: destinationName });
  } catch {
    if (isRootNode) {
      destination = findOneSystem({ name: selectedMap.rootSystemName });
    }
  }

  const RootNodeName = () => (
    <AppLink to={`/system/${selectedMap.rootSystemName}`}>{selectedMap.name}</AppLink>
  );

  const ConnectionName = () =>
    destinationName ? (
      <AppLink to={`/system/${destinationName}`}>{name || destinationName}</AppLink>
    ) : (
      <Typography>{name}</Typography>
    );

  return (
    <>
      <MapNodeRect
        width={100}
        height={70}
        x={-50}
        y={-35}
        rx={10}
        securityclass={destination?.securityClass || null}
      />
      <foreignObject width={100} height={70} x={-50} y={-35}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {isRootNode ? <RootNodeName /> : <ConnectionName />}
          <WhTypeLabel type={type} wormhole={wormhole} />
        </Box>
      </foreignObject>
    </>
  );
};

export default MapNode;
