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

/**
 * Require folder role.
 * @param role Minimum required role level.
 */
export const RequireFolderRole = (role: Roles) =>
  applyDecorators(SetMetadata("folderRole", role), UseGuards(AuthGuard, RoleGuard));
