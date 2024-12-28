import { SystemRoles } from "../generated/graphql-operations";

const systemRoleValues = {
  [SystemRoles.None]: 0,
  [SystemRoles.User]: 1,
  [SystemRoles.Manager]: 2,
  [SystemRoles.Administrator]: 3,
};

/**
 * Check that given role is at least manager.
 *
 * @param role System role.
 * @returns `true` if role check passed.
 */
export const atLeastManager = (
  role: SystemRoles | null | undefined,
): boolean => {
  if (!role) {
    return false;
  }
  return systemRoleValues[role] >= systemRoleValues.MANAGER;
};

/**
 * Compare two roles (inclusive).
 *
 * @param role System role to check.
 * @param minRole Lowest role to accept.
 * @returns `true` if role check passed.
 */
export const roleIsAtLeast = (
  role: SystemRoles,
  minRole: SystemRoles,
): boolean => systemRoleValues[role] >= systemRoleValues[minRole];
