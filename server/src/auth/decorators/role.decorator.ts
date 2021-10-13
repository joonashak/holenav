import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import Roles from "../../role/roles.enum";
import { AuthGuard } from "../guards/auth.guard";
import {
  requiredRoleLevelKey,
  requiredRoleTypeKey,
  RequiredRoleTypes,
  RoleGuard,
} from "../guards/role.guard";

/**
 * Configure `RoleGuard` to require at least given system-level role.
 * Access token must be passed in request headers.
 * @param role Minimum required role level.
 */
export const RequireSystemRole = (role: Roles) =>
  applyDecorators(
    UseGuards(AuthGuard, RoleGuard),
    SetMetadata(requiredRoleLevelKey, role),
    SetMetadata(requiredRoleTypeKey, RequiredRoleTypes.SYSTEM),
  );

/**
 * Require the user to have the given folder role to activate the decorated function.
 * Access token and active folder id must be passed in request headers.
 * @param role Minimum required role level.
 */
export const RequireFolderRole = (role: Roles) =>
  applyDecorators(
    SetMetadata(requiredRoleLevelKey, role),
    UseGuards(AuthGuard, RoleGuard),
    SetMetadata(requiredRoleTypeKey, RequiredRoleTypes.FOLDER),
  );
