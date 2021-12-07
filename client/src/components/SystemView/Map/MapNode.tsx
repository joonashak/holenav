import { Box, styled, Typography } from "@mui/material";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";
import AppLink from "../../common/AppLink";
import useUserData from "../../UserData/useUserData";
import { MapNodeDatum } from "./MapData/types";

const Rect = (props: any) => <rect {...props} />;
const MapNodeRect = styled(Rect)(({ theme }) => ({
  "&&": {
    stroke: theme.palette.primary.light,
    strokeWidth: 1,
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

  const RootNodeName = () => <AppLink to={`/system/${name}`}>{selectedMap.name}</AppLink>;

  const ConnectionName = () =>
    destinationName ? (
      <AppLink to={`/system/${destinationName}`}>{name || destinationName}</AppLink>
    ) : (
      <Typography>{name}</Typography>
    );

  return (
    <>
      <MapNodeRect width={100} height={70} x={-50} y={-35} rx={10} />
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
