import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import Roles from "../../role/roles.enum";
import FolderRoles from "../../user/roles/folderRoles.enum";
import { AuthGuard } from "../guards/auth.guard";
import { FolderRoleGuard, requiredFolderRoleKey } from "../guards/folderRole.guard";
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
export const RequireFolderRole = (role: FolderRoles) =>
  applyDecorators(SetMetadata(requiredFolderRoleKey, role), UseGuards(AuthGuard, FolderRoleGuard));
