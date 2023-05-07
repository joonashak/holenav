import _dayjs from "dayjs";
import Duration from "dayjs/plugin/duration";

const dayjs = _dayjs;
dayjs.extend(Duration);

export default dayjs;

/**
 * Get formatted string of the minute part of a given negative `Duration` without sign but with leading zero.
 *
 * `dayjs.duration` formatting does not work with these durations as it adds a sign to the minutes but not the
 * leading zero.
 */
export const fixNegativeDurationMinuteFormatting = (dur: Duration.Duration) => {
  const mm = dur.format("mm");
  if (mm.length === 2) {
    return `0${mm.substring(1)}`;
  }
  return mm.substring(1);
};
