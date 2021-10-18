import { Typography, Box, styled } from "@mui/material";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";

// FIXME: Don't hack styles...
// eslint-disable-next-line
const Hack = (props: any) => <rect {...props} />;
const MapNodeRect = styled(Hack)(({ theme }) => ({
  "&&": {
    stroke: theme.palette.primary.light,
    strokeWidth: 1,
    fill: theme.palette.primary.main,
  },
}));

export default ({ nodeDatum }: CustomNodeElementProps) => {
  const { name } = nodeDatum;

  return (
    <>
      <MapNodeRect width={100} height={70} x={-50} y={-35} rx={10} />
      <foreignObject width={100} height={70} x={-50} y={-35}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Typography>{name}</Typography>
        </Box>
      </foreignObject>
    </>
  );
};
