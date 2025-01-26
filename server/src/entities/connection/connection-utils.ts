import wormholes from "@eve-data/wormholes";
import dayjs from "dayjs";
import { Connection } from "./connection.model";

type EolProps = {
  eol?: boolean;
  eolAt?: Date | null;
  type?: string | null;
  to?: string | null;
};

/**
 * Educated guess of when WH will go EOL (or if it already did).
 *
 * This should be used for the "primary" side connection. The guesswork is
 * designed to be conservative to avoid marking connections EOL too early which
 * would cause them to be removed automatically too early.
 */
export const computeEolAt = (
  createOrUpdate: EolProps,
  prev?: Connection,
): Date | null => {
  if (!prev) {
    return computeEolAtForNew(createOrUpdate);
  }

  return computeEolAtForUpdate(createOrUpdate, prev);
};

const computeEolAtForNew = (conn: EolProps): Date => {
  if (conn.eol) {
    return now();
  }

  if (conn.type && !conn.to) {
    return computeEolAtByType(conn.type);
  }

  if (conn.type && conn.to) {
    return computeEolAtByType(conn.type, true);
  }

  if (conn.to) {
    // Type is missing; guess 24-hour WH.
    return computeEolAtByType("H296", true);
  }

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

  if (!prev.eol && !update.eol) {
    const newEolAt = computeEolAtForNew(update);
    return dayjs(newEolAt).isBefore(dayjs(prev.eolAt)) ? newEolAt : prev.eolAt;
  }

  return prev.eolAt;
};

const now = () => dayjs().toDate();

const getLifetime = (type: string): number => {
  const wormhole = wormholes.find((wh) => wh.type === type);
  return wormhole?.lifetimeHrs || 24;
};

/**
 * Approximation of latest EOL time for connection.
 *
 * The `activated` parameter should be switched on if there is evidence that the
 * connection has been traversed, i.e., lifetime timer has definitely started to
 * tick.
 *
 * The `extra` value is sourced through talks with experienced wormholers but
 * might not be accurate.
 */
const computeEolAtByType = (type: string, activated = false): Date => {
  const lifetime = getLifetime(type);
  let maxHoursBeforeEol = lifetime * 1.1 - 4;

  if (!activated) {
    const extra = lifetime < 24 ? 2 : 9;
    maxHoursBeforeEol += extra;
  }

  return dayjs().add(maxHoursBeforeEol, "hours").toDate();
};
