/* eslint-disable @typescript-eslint/ban-types */
import { get, set } from "lodash";
import { DateTime } from "neo4j-driver";

/**
 * Convert Neo4j DateTime into JS Date object.
 */
export const dateTimeToJsDate = (dateTime: DateTime | undefined): Date => {
  if (!dateTime) {
    return null;
  }

  const { year, month, day, hour, minute, second, nanosecond } = dateTime;
  const zeroIndexedMonth = Number(month) - 1;
  const milliseconds = Number(nanosecond) / 1000000;

  return new Date(
    Number(year),
    zeroIndexedMonth,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
    milliseconds,
  );
};

export const mapDateTimeToJsDateByKey =
  <T extends object>(keys: string[]) =>
  (obj: T) => {
    for (const key of keys) {
      set(obj, key, dateTimeToJsDate(get(obj, key)));
    }
    return obj;
  };
