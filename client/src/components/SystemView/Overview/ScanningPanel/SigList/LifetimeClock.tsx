import { Box, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Signature } from "../../../../../generated/graphqlOperations";
import { getWormholeProperties, getWormholeTrueType } from "../../../../../utils/wormholeUtils";

type LifetimeClockProps = {
  signature: Signature;
};

const LifetimeClock = ({ signature }: LifetimeClockProps) => {
  const eol = !!signature.connection?.eol;
  const { palette } = useTheme();

  const trueType = getWormholeTrueType(signature);
  const whProps = getWormholeProperties(trueType);

  const lifetimeHrs = whProps?.lifetimeHrs || 24;
  const lifetimeMins = lifetimeHrs * 60;
  const ageMins = dayjs().diff(dayjs(signature.createdAt), "minutes");
  const remainingLife = lifetimeMins - ageMins;
  const value = Math.max(0, (remainingLife / lifetimeMins) * 100);

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
