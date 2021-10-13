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
import Roles from "../../role/roles.enum";
import { User } from "../../user/user.model";

export const requiredRoleLevelKey = "requiredRoleLevel";
export const requiredRoleTypeKey = "requiredRoleType";

export enum RequiredRoleTypes {
  SYSTEM,
  FOLDER,
}

/**
 * Guard to require *at least* a certain role for access. Use metadata to configure
 * what role level is required and whether to check for system or folder roles.
 * See `@RequireSystemRole` and `@RequireFolderRole` decorators.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  private context: ExecutionContext;

  constructor(private reflector: Reflector, private folderService: FolderService) {}

  async canActivate(context: ExecutionContext) {
    this.context = context;
    const gqlContext = GqlExecutionContext.create(context);
    const { user } = gqlContext.getContext().req;

    const requiredRoleType = this.reflector.get<RequiredRoleTypes>(
      requiredRoleTypeKey,
      context.getHandler(),
    );

    if (requiredRoleType === RequiredRoleTypes.SYSTEM) {
      return this.canActivateSystemResource(user);
    }

    return await this.canActivateFolderResource(user);
  }

  private getRequiredRole(): Roles {
    const requiredRole = this.reflector.get<Roles>(requiredRoleLevelKey, this.context.getHandler());
    return requiredRole || Roles.ADMIN;
  }

  private canActivateSystemResource(user: User): boolean {
    const requiredRole = this.getRequiredRole();
    const systemRole = this.getSystemRole(user);
    return systemRole >= requiredRole;
  }

  private getSystemRole(user: User): Roles {
    const { roles } = user;
    const systemRoles = roles.filter(({ folder }) => !folder);
    const roleLevels = systemRoles.map(({ role }) => role);
    return Math.max(...roleLevels);
  }

  private async canActivateFolderResource(user: User): Promise<boolean> {
    const requiredRole = this.getRequiredRole();
    const folderRole = await this.getFolderRole(user);
    return folderRole >= requiredRole;
  }

  private async getFolderRole(user: User): Promise<Roles> {
    const gqlContext = GqlExecutionContext.create(this.context);
    const request = gqlContext.getContext().req;

    const folderId = request.headers.activefolder;
    if (!folderId) {
      throw new HttpException(
        "Active folder's ID must be passed in headers.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const folder = await this.folderService.getFolderById(folderId);
    if (!folder) {
      throw new HttpException("Active folder not found.", HttpStatus.BAD_REQUEST);
    }

    request.activeFolder = folder;

    const folderRoles = user.roles.filter(({ folder }) => folder.id === folderId);
    const roleLevels = folderRoles.map(({ role }) => role);
    return Math.max(...roleLevels);
  }
}
