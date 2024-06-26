type AddUuidOptions = {
  overwrite: boolean;
};

const defaultOptions: AddUuidOptions = {
  overwrite: false,
};

/**
 * Add random UUID to any object. By default, existing id is not overwritten.
 *
 * @param obj Object to append with UUID.
 * @param opt Optional configuration. Pass `{ overwrite: true }` to overwrite
 *   existing id.
 * @returns Given object with random UUID as value of `id` field.
 */
export const addUuid = <T>(
  obj: T,
  opt: AddUuidOptions = defaultOptions,
): T & { id: string } => {
  const id = crypto.randomUUID();

  if (opt.overwrite) {
    return { ...obj, id };
  }

  return { id, ...obj };
};
