import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import FolderRoles from "../../user/roles/folderRoles.enum";
import SystemRoles from "../../user/roles/systemRoles.enum";
import { AuthGuard } from "../guards/auth.guard";
import { FolderRoleGuard, requiredFolderRoleKey } from "../guards/folderRole.guard";
import { requiredSystemRoleKey, SystemRoleGuard } from "../guards/systemRole.guard";

/**
 * Require the user to have the given system-level role to activate the decorated function.
 * Access token must be passed in request headers.
 * @param role Minimum required role level.
 */
export const RequireSystemRole = (role: SystemRoles) =>
  applyDecorators(SetMetadata(requiredSystemRoleKey, role), UseGuards(AuthGuard, SystemRoleGuard));

/**
 * Require the user to have the given folder role to activate the decorated function.
 * Access token and active folder id must be passed in request headers.
 * @param role Minimum required role level.
 */
export const RequireFolderRole = (role: FolderRoles) =>
  applyDecorators(SetMetadata(requiredFolderRoleKey, role), UseGuards(AuthGuard, FolderRoleGuard));
