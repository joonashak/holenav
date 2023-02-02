import { Box, Tooltip, useTheme } from "@mui/material";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Signature } from "../../../../../generated/graphqlOperations";
import dayjs, { fixNegativeDurationMinuteFormatting } from "../../../../../utils/dayjs";
import { getWormholeProperties, getWormholeTrueType } from "../../../../../utils/wormholeUtils";

type LifetimeClockProps = {
  signature: Signature;
};

const LifetimeClock = ({ signature }: LifetimeClockProps) => {
  const eol = !!signature.connection?.eol;
  const { palette } = useTheme();

  const trueType = getWormholeTrueType(signature);
  const whProps = getWormholeProperties(trueType);

  const lifetime = dayjs.duration(whProps?.lifetimeHrs || 24, "h");
  const createdAt = dayjs(signature.createdAt);
  const age = dayjs.duration(dayjs().diff(createdAt));
  const remainingLife = lifetime.subtract(age);
  const value = Math.max(0, (remainingLife.asMinutes() / lifetime.asMinutes()) * 100);

  const overdue = remainingLife.asMilliseconds() < 0;
  const durationStringH = overdue
    ? remainingLife.format("H").substring(1)
    : remainingLife.format("H");
  const durationStringM = !overdue
    ? remainingLife.format("mm")
    : fixNegativeDurationMinuteFormatting(remainingLife);
  const durationString = [durationStringH, durationStringM].join(":");
  const tooltipTitle = overdue
    ? `Overdue by: ${durationString}`
    : `Lifetime left: ${durationString}`;

  return (
    <Tooltip title={tooltipTitle} arrow>
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
    </Tooltip>
  );
};

export default LifetimeClock;
