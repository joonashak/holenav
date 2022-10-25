import { v4 } from "uuid";
import { CreatableSignature } from "../entities/signature/dto/add-signatures.dto";
import { Signature, SignatureWithoutConnection } from "../entities/signature/signature.model";

type AddUuidOptions = {
  overwrite: boolean;
};

const defaultOptions: AddUuidOptions = {
  overwrite: false,
};

/**
 * Add random UUID to any object. By default, existing id is not overwritten.
 * @param obj Object to append with UUID.
 * @param opt Optional configuration. Pass `{ overwrite: true }` to overwrite existing id.
 * @returns Given object with random UUID as value of `id` field.
 */
export const addUuid = <T>(obj: T, opt: AddUuidOptions = defaultOptions): T & { id: string } => {
  const id = v4();

  if (opt.overwrite) {
    return { ...obj, id };
  }

  return { id, ...obj };
};

/**
 * Like `addUuid` but also adds an UUID to reverse side signature, if one exists.
 */
export const addUuidToSignatureAndReverseSignature = (
  signature: Signature | CreatableSignature,
): Signature | SignatureWithoutConnection => {
  const sigWithUuid = addUuid(signature, { overwrite: true });

  if (sigWithUuid.connection?.reverseSignature) {
    sigWithUuid.connection.reverseSignature = addUuid(sigWithUuid.connection.reverseSignature, {
      overwrite: true,
    });
  }

  return sigWithUuid;
};
