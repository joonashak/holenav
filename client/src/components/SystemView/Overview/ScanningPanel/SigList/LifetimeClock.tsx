import { Box, useTheme } from "@mui/material";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Signature } from "../../../../../generated/graphqlOperations";

type LifetimeClockProps = {
  signature: Signature;
};

const LifetimeClock = ({ signature }: LifetimeClockProps) => {
  const eol = !!signature.connection?.eol;
  const { palette } = useTheme();

  // TODO: Calculate value.
  const value = 20;

  return (
    <Box sx={{ display: "block", width: 16 }}>
      <CircularProgressbar
        value={Math.max(5, value)}
        strokeWidth={50}
        styles={buildStyles({
          strokeLinecap: "butt",
          pathColor: eol ? palette.error.light : palette.secondary.light,
          trailColor: eol ? palette.error.dark : palette.secondary.dark,
        })}
      />
    </Box>
  );
};

export default LifetimeClock;
