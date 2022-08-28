import { findOneSystem } from "@eve-data/systems";
import { System } from "@eve-data/systems/lib/src/api/system.type";
import { Box, Typography } from "@mui/material";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";
import AppLink from "../../../common/AppLink";
import useUserData from "../../../UserData/useUserData";
import useSystemData from "../../SystemData/useSystemData";
import { MapNodeDatum } from "../MapData/types";
import MapNodeRect from "./MapNodeRect";
import WhTypeLabel from "./WhTypeLabel";

export type MapNodeProps = CustomNodeElementProps & {
  nodeDatum: MapNodeDatum;
};

const MapNode = ({ nodeDatum }: MapNodeProps) => {
  const { settings } = useUserData();
  const { signature } = nodeDatum;
  const { name: selectedSystemName } = useSystemData();

  const name = signature?.name || "";
  const type = signature?.connection?.wormholeType || "";
  const destinationName = signature?.connection?.destinationName || "";

  const { selectedMap } = settings;
  const isRootNode = nodeDatum.__rd3t.depth === 0;
  const isSelectedSystem =
    destinationName === selectedSystemName ||
    (isRootNode && selectedSystemName === selectedMap.rootSystemName);

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
      {isSelectedSystem && (
        <rect
          width={106}
          height={76}
          x={-53}
          y={-38}
          rx={13}
          style={{
            stroke: "#676767",
            strokeWidth: 10,
          }}
        />
      )}
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
          <WhTypeLabel type={type} signature={signature} />
        </Box>
      </foreignObject>
    </>
  );
};

export default MapNode;
