import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FolderService } from "../../entities/folder/folder.service";
import FolderRole from "../../user/roles/folder-role.enum";
import getRequest from "../utils/get-request.util";

export const requiredFolderRoleKey = "requiredFolderRole";

@Injectable()
export class FolderRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private folderService: FolderService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.getRequiredRole(context);
    const activeFolderRole = await this.getActiveFolderRole(context);
    return requiredRole <= activeFolderRole;
  }

  private getRequiredRole(context: ExecutionContext): FolderRole {
    const requiredRole = this.reflector.get<FolderRole>(
      requiredFolderRoleKey,
      context.getHandler(),
    );
    if (!requiredRole) {
      throw new InternalServerErrorException(
        "Required folder role not configured.",
      );
    }

    return requiredRole;
  }

  private async getActiveFolderRole(
    context: ExecutionContext,
  ): Promise<FolderRole> {
    const request = getRequest(context);

    const activeFolderId = request.headers.activefolder;
    if (!activeFolderId) {
      throw new BadRequestException(
        "Active folder's ID must be passed in headers.",
      );
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
