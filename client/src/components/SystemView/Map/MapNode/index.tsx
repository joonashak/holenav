import { findOneSystem } from "@eve-data/systems";
import { System } from "@eve-data/systems/lib/src/api/system.type";
import { Box } from "@mui/material";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";
import useUserData from "../../../UserData/useUserData";
import useSystemData from "../../SystemData/useSystemData";
import { MapNodeDatum } from "../MapData/types";
import ConnectionName from "./ConnectionName";
import MapNodeRect from "./MapNodeRect";
import RootNodeName from "./RootNodeName";
import WhTypeLabel from "./WhTypeLabel";

export type MapNodeProps = CustomNodeElementProps & {
  nodeDatum: MapNodeDatum;
};

const MapNode = ({ nodeDatum }: MapNodeProps) => {
  const { settings } = useUserData();
  const { wormhole } = nodeDatum;
  const { name: selectedSystemName } = useSystemData();

  const name = nodeDatum?.name || "";
  const type = wormhole?.wormholeType || "";
  const destinationName = wormhole?.destinationName || "";

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

  const showDestinationLink = !!destinationName && !wormhole?.unknownDestination;

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
          {isRootNode ? (
            <RootNodeName rootSystemName={selectedMap.rootSystemName} mapName={selectedMap.name} />
          ) : (
            <ConnectionName
              showDestinationLink={showDestinationLink}
              destinationName={destinationName}
              name={name}
            />
          )}
          <WhTypeLabel type={type} signature={wormhole} />
        </Box>
      </foreignObject>
    </>
  );
};

export default MapNode;
