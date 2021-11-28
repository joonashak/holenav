import { Box, styled } from "@mui/material";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";
import AppLink from "../../common/AppLink";

const Rect = (props: any) => <rect {...props} />;
const MapNodeRect = styled(Rect)(({ theme }) => ({
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
          <AppLink to={`/system/${name}`}>{name}</AppLink>
        </Box>
      </foreignObject>
    </>
  );
};
