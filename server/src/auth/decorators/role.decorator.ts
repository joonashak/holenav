import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import FolderRole from "../../user/roles/folder-role.enum";
import SystemRole from "../../user/roles/system-role.enum";
import { TokenAuthGuard } from "../guards/token-auth.guard";
import {
  FolderRoleGuard,
  requiredFolderRoleKey,
} from "../guards/folder-role.guard";
import {
  requiredSystemRoleKey,
  SystemRoleGuard,
} from "../guards/system-role.guard";
import { DevKeyGuard } from "../guards/dev-key.guard";

/**
 * Require the user to have the given system-level role to activate the
 * decorated function. Access token must be passed in request headers.
 *
 * @param role Minimum required role level.
 */
export const RequireSystemRole = (role: SystemRole) =>
  applyDecorators(
    SetMetadata(requiredSystemRoleKey, role),
    UseGuards(TokenAuthGuard, SystemRoleGuard, DevKeyGuard),
  );

/**
 * Require the user to have the given folder role to activate the decorated
 * function. Access token and active folder id must be passed in request
 * headers.
 *
 * @param role Minimum required role level.
 */
export const RequireFolderRole = (role: FolderRole) =>
  applyDecorators(
    SetMetadata(requiredFolderRoleKey, role),
    UseGuards(TokenAuthGuard, FolderRoleGuard, DevKeyGuard),
  );
