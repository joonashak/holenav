import { Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";

const useStyles = makeStyles((theme: Theme) => ({
  rect: {
    stroke: theme.palette.primary.light,
    strokeWidth: 1,
    fill: theme.palette.primary.main,
  },
  labelContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
}));

export default ({ nodeDatum }: CustomNodeElementProps) => {
  const classes = useStyles();
  const { name } = nodeDatum;

  return (
    <>
      <rect width={100} height={70} x={-50} y={-35} rx={10} className={classes.rect} />
      <foreignObject width={100} height={70} x={-50} y={-35}>
        <div className={classes.labelContainer}>
          <Typography>{name}</Typography>
        </div>
      </foreignObject>
    </>
  );
};
