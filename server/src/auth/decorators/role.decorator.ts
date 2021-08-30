import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import Roles from "../../role/roles.enum";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";

/**
 * Configure `RoleGuard` to require at least given app-level role.
 * @param role Required role level.
 */
export const SystemRole = (role: Roles) =>
  applyDecorators(UseGuards(AuthGuard, RoleGuard), SetMetadata("systemRole", role));

export type FolderRoleSpec = {
  role: Roles;
  key: string;
};

/**
 * Require folder role.
 * @param role Minimum required role level.
 * @param folderKey GraphQL argument key where applicable folder ID is
 * supplied, if not `folderId`.
 */
export const RequireFolderRole = (role: Roles, folderKey = "folderId") =>
  applyDecorators(
    SetMetadata("folderRole", { role, key: folderKey }),
    UseGuards(AuthGuard, RoleGuard),
  );
