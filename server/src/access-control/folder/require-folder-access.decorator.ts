import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import {
  FOLDER_GUARD_ACTION_KEY,
  FolderAccessGuard,
} from "./folder-access.guard";
import { FolderAction } from "./folder-role/folder-action.enum";

/**
 * Require folder access using `FolderAccessGuard`.
 *
 * Checks that the user is allowed to perform given action on a folder. Assumes
 * that the folder is specified in GraphQL variables object under key
 * `folderId`.
 *
 * `FolderAccessControlModule` must be imported when this decorator is used.
 */
export const RequireFolderAccess = (action: FolderAction) =>
  applyDecorators(
    SetMetadata(FOLDER_GUARD_ACTION_KEY, action),
    UseGuards(FolderAccessGuard),
  );
