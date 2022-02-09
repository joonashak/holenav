import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { FolderService } from "../../entities/folder/folder.service";
import FolderRoles from "../../user/folderRoles/folderRoles.enum";

export const requiredFolderRoleKey = "requiredFolderRole";

@Injectable()
export class FolderRoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private folderService: FolderService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.getRequiredRole(context);
    const activeFolderRole = await this.getActiveFolderRole(context);
    return requiredRole <= activeFolderRole;
  }

  private getRequiredRole(context: ExecutionContext): FolderRoles {
    const requiredRole = this.reflector.get<FolderRoles>(
      requiredFolderRoleKey,
      context.getHandler(),
    );
    if (!requiredRole) {
      throw new HttpException(
        "Required folder role not configured.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return requiredRole;
  }

  private async getActiveFolderRole(context: ExecutionContext): Promise<FolderRoles> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    const activeFolderId = request.headers.activefolder;
    if (!activeFolderId) {
      throw new HttpException(
        "Active folder's ID must be passed in headers.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const activeFolder = await this.folderService.getFolderById(activeFolderId);
    if (!activeFolder) {
      throw new HttpException("Active folder not found.", HttpStatus.BAD_REQUEST);
    }

    request.activeFolder = activeFolder;

    const folderRoles = request.user.folderRoles.filter(
      ({ folder }) => folder.toString() === activeFolder._id.toString(),
    );
    const roleLevels = folderRoles.map(({ role }) => role);
    return Math.max(...roleLevels);
  }
}
