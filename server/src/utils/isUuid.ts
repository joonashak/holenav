const uuid =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Test if `value` is valid UUID. */
const isUuid = (value: unknown): boolean =>
  typeof value === "string" && uuid.test(value);

export default isUuid;
