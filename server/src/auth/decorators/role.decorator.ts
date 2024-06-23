import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import SystemRole from "../../user/roles/system-role.enum";
import {
  requiredSystemRoleKey,
  SystemRoleGuard,
} from "../guards/system-role.guard";
import { TokenAuthGuard } from "../guards/token-auth.guard";

/**
 * Require the user to have the given system-level role to activate the
 * decorated function. Access token must be passed in request headers.
 *
 * @param role Minimum required role level.
 */
export const RequireSystemRole = (role: SystemRole) =>
  applyDecorators(
    SetMetadata(requiredSystemRoleKey, role),
    UseGuards(TokenAuthGuard, SystemRoleGuard),
  );
