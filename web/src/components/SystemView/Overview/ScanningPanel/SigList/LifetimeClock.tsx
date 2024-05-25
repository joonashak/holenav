import { Box, useTheme } from "@mui/material";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Signature } from "../../../../../generated/graphqlOperations";
import dayjs, {
  fixNegativeDurationMinuteFormatting,
} from "../../../../../utils/dayjs";
import {
  getWormholeProperties,
  getWormholeTrueType,
} from "../../../../../utils/wormholeUtils";
import GridTooltip from "../../../../common/GridToolTip";

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
  const eolAt = eol ? dayjs(signature.connection?.eolAt) : createdAt;
  const age = dayjs.duration(dayjs().diff(createdAt));
  const ageSinceEol = dayjs.duration(dayjs().diff(eolAt));
  const remainingStdLife = lifetime.subtract(age);
  const remainingEolLife = dayjs.duration({ hours: 4 }).subtract(ageSinceEol);
  const remainingLife = eol ? remainingEolLife : remainingStdLife;
  const value = Math.max(
    0,
    (remainingLife.asMinutes() / lifetime.asMinutes()) * 100,
  );

  const overdue = remainingLife.asMilliseconds() < 0;
  const durationStringH = overdue
    ? remainingLife.format("H").substring(1)
    : remainingLife.format("H");
  const durationStringM = !overdue
    ? remainingLife.format("mm")
    : fixNegativeDurationMinuteFormatting(remainingLife);
  const durationString = [durationStringH, durationStringM].join(":");
  const tooltipTitle = overdue ? `Overdue by` : `Lifetime left`;
  const tooltipRows = [{ label: tooltipTitle, value: durationString }];

  return (
    <GridTooltip rows={tooltipRows}>
      <Box sx={{ display: "block", width: 16 }}>
        <CircularProgressbar
          value={value}
          strokeWidth={50}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: eol ? palette.error.light : palette.secondary.light,
            trailColor: eol ? palette.error.dark : palette.secondary.dark,
          })}
        />
      </Box>
    </GridTooltip>
  );
};

export default LifetimeClock;
