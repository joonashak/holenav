import { Box, styled, Typography } from "@mui/material";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";
import AppLink from "../../common/AppLink";
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
  const { name, type } = nodeDatum;

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
          <AppLink to={`/system/${name}`}>{name}</AppLink>
          <Typography variant="caption">{type}</Typography>
        </Box>
      </foreignObject>
    </>
  );
};

export default MapNode;
