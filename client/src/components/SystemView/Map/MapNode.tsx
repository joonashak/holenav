import { findOneSystem } from "@eve-data/systems";
import { System } from "@eve-data/systems/lib/src/api/system.type";
import { Box, styled, Theme, Typography } from "@mui/material";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";
import AppLink from "../../common/AppLink";
import useUserData from "../../UserData/useUserData";
import { MapNodeDatum } from "./MapData/types";

const getSecurityStyle = (securityClass: string, theme: Theme) => {
  if (securityClass === "NULL") {
    return theme.palette.error.light;
  }
  if (securityClass === "LOW") {
    return theme.palette.warning.light;
  }
  if (securityClass === "HIGH") {
    return theme.palette.secondary.light;
  }
  return theme.palette.primary.light;
};

const Rect = (props: any) => <rect {...props} />;
const MapNodeRect = styled(Rect)(({ theme, securityclass }) => ({
  "&&": {
    stroke: getSecurityStyle(securityclass, theme),
    strokeWidth: securityclass === "WH" ? 1 : 3,
    fill: theme.palette.primary.main,
  },
}));

export type MapNodeProps = CustomNodeElementProps & {
  nodeDatum: MapNodeDatum;
};

const MapNode = ({ nodeDatum }: MapNodeProps) => {
  const { name, type, destinationName } = nodeDatum;
  const { settings } = useUserData();
  const { selectedMap } = settings;

  let destination: System | null = null;

  try {
    destination = findOneSystem({ name: destinationName });
  } catch {
    if (nodeDatum.__rd3t.depth === 0) {
      destination = findOneSystem({ name: selectedMap.rootSystemName });
    }
  }

  const RootNodeName = () => <AppLink to={`/system/${name}`}>{selectedMap.name}</AppLink>;

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
          {nodeDatum.__rd3t.depth ? <ConnectionName /> : <RootNodeName />}
          <Typography variant="caption">{type}</Typography>
        </Box>
      </foreignObject>
    </>
  );
};

export default MapNode;
