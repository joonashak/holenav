import { USER_ID_KEY_IN_SESSION } from "@joonashak/nestjs-clone-bay";
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import getRequest from "../../auth/utils/get-request.util";
import { FolderAction } from "./folder-role/folder-action.enum";
import { FolderAccessControl } from "./folder.access-control";

export const FOLDER_GUARD_ACTION_KEY = "folder-guard-action";

@Injectable()
export class FolderAccessGuard implements CanActivate {
  constructor(
    private folderAccessControl: FolderAccessControl,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = getRequest(context);
    const folderId = this.getFolderId(request);
    const userId = this.getUserID(request);
    const action = this.getAction(context);

    return this.folderAccessControl.authorize(userId, folderId, action);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getFolderId(request: any): string {
    if (!request.body.variables) {
      throw new BadRequestException(
        "GraphQL variables were not found in the request.",
      );
    }

    const folderId = request.body.variables.folderId;

    if (!folderId) {
      throw new BadRequestException(
        "Folder ID was not found in GraphQL variables.",
      );
    }

    return folderId;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getUserID(request: any): string {
    const userId = request.session[USER_ID_KEY_IN_SESSION];

    if (!userId) {
      throw new BadRequestException("User ID was not found in session.");
    }

    return userId;
  }

  private getAction(context: ExecutionContext): FolderAction {
    const action = this.reflector.get<FolderAction>(
      FOLDER_GUARD_ACTION_KEY,
      context.getHandler(),
    );

    if (!action) {
      throw new InternalServerErrorException(
        "Required folder action not specified.",
      );
    }

    return action;
  }
}
