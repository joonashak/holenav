import { SetMetadata } from "@nestjs/common";
import Roles from "../../role/roles.enum";

/**
 * Configure `RoleGuard` to require at least given app-level role.
 * @param role Required role level.
 */
export const SystemRole = (role: Roles) => SetMetadata("systemRole", role);

export type FolderRoleSpec = {
  role: Roles;
  key: string;
};

/**
 * Configure `RoleGuard` to require at least given folder-level role.
 * @param folder {object} - Object with field `role` specifying the required
 * role level and `key` specifying the name of the GraphQL argument field
 * wherefrom the id of the folder in question can be read.
 */
export const FolderRole = (folder: FolderRoleSpec) => SetMetadata("folderRole", folder);
