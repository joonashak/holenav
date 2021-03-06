import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { FolderService } from "../../entities/folder/folder.service";
import FolderRoles from "../../user/roles/folder-roles.enum";

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
      throw new InternalServerErrorException("Required folder role not configured.");
    }

    return requiredRole;
  }

  private async getActiveFolderRole(context: ExecutionContext): Promise<FolderRoles> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    const activeFolderId = request.headers.activefolder;
    if (!activeFolderId) {
      throw new BadRequestException("Active folder's ID must be passed in headers.");
    }

    const activeFolder = await this.folderService.getFolderById(activeFolderId);
    if (!activeFolder) {
      throw new BadRequestException("Active folder not found.");
    }

    request.activeFolder = activeFolder;

    const folderRoles = request.user.folderRoles.filter(
      ({ folder }) => folder.toString() === activeFolder._id.toString(),
    );
    const roleLevels = folderRoles.map(({ role }) => role);
    return Math.max(...roleLevels);
  }
}
