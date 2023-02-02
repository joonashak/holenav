import { DateTime } from "neo4j-driver";

/**
 * Convert Neo4j DateTime into JS Date object.
 */
export const dateTimeToJsDate = (dateTime: DateTime): Date => {
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

export const mapDateTimeToJsDateByKey = (keys: string[]) => (obj: unknown) => {
  for (const key of keys) {
    obj[key] = dateTimeToJsDate(obj[key]);
  }
  return obj;
};
