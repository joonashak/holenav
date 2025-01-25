import dayjs from "dayjs";
import { Connection } from "./connection.model";

type EolProps = {
  eol?: boolean;
  eolAt?: Date | null;
  type?: string | null;
};

export const computeEolAt = (
  createOrUpdate: EolProps,
  prev?: Connection,
): Date | null => {
  if (!prev) {
    return computeEolAtForNew(createOrUpdate);
  }

  return computeEolAtForUpdate(createOrUpdate, prev);
};

const computeEolAtForNew = (conn: EolProps): Date | null => {
  if (conn.eol) {
    return now();
  }

  if (!conn.eol) {
    // TODO: Compute based on WH type.
  }

  // TODO: If destination system is reported, we could use an earlier eolAt.
  // Assume the WH was not even warped to and could theoretically live forever;
  // mark as EOL after two days as a reasonable guess.
  return dayjs().add(2, "days").toDate();
};

const computeEolAtForUpdate = (
  update: EolProps,
  prev: Connection,
): Date | null => {
  if (!prev.eol && update.eol) {
    return now();
  }

  if (prev.eol && update.eol === false) {
    // This probably means that the WH has been automatically marked as EOL too early.
    // If previous guess was reasonable, a small increment should be enough.
    return dayjs().add(1, "hour").toDate();
  }

  if (prev.type !== update.type) {
    // TODO: Compute based on WH type and previous eolAt value.
  }

  return prev.eolAt;
};

const now = () => dayjs().toDate();
