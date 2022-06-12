import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import FolderRoles from "../../user/roles/folder-roles.enum";
import SystemRoles from "../../user/roles/system-roles.enum";
import { TokenAuthGuard } from "../guards/token-auth.guard";
import { FolderRoleGuard, requiredFolderRoleKey } from "../guards/folder-role.guard";
import { requiredSystemRoleKey, SystemRoleGuard } from "../guards/system-role.guard";

/**
 * Require the user to have the given system-level role to activate the decorated function.
 * Access token must be passed in request headers.
 * @param role Minimum required role level.
 */
export const RequireSystemRole = (role: SystemRoles) =>
  applyDecorators(
    SetMetadata(requiredSystemRoleKey, role),
    UseGuards(TokenAuthGuard, SystemRoleGuard),
  );

/**
 * Require the user to have the given folder role to activate the decorated function.
 * Access token and active folder id must be passed in request headers.
 * @param role Minimum required role level.
 */
export const RequireFolderRole = (role: FolderRoles) =>
  applyDecorators(
    SetMetadata(requiredFolderRoleKey, role),
    UseGuards(TokenAuthGuard, FolderRoleGuard),
  );
