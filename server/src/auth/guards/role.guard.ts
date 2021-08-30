import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Role } from "../../role/role.model";
import Roles from "../../role/roles.enum";
import { User } from "../../user/user.model";
import { FolderRoleSpec } from "../decorators/role.decorator";

/**
 * Guard to require *at least* a certain role for access. Use with custom
 * `@SystemRole` or `@FolderRole` decorator to specify what role is required,
 * otherwise this guard defaults to admin role.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const { user } = gqlContext.getContext().req;

    const requiredRole = this.getRequiredRole(context);
    const userRole = this.getUserRole(user, context);

    return userRole >= requiredRole;
  }

  getRequiredRole(context: ExecutionContext): Roles {
    const systemRole = this.reflector.get<Roles>("systemRole", context.getHandler());
    const { role: folderRole } = this.reflector.get<FolderRoleSpec>(
      "folderRole",
      context.getHandler(),
    );

    const requiredRole = systemRole || folderRole || Roles.ADMIN;
    return requiredRole;
  }

  getUserRole(user: User, context: ExecutionContext): Roles {
    const systemRoleMode = !!this.reflector.get<Roles>("systemRole", context.getHandler());
    const roles = systemRoleMode ? this.getSystemRoles(user) : this.getFolderRoles(user, context);

    const roleLevels = roles.map(({ role }) => role);
    const maxRole = Math.max(...roleLevels);

    return maxRole;
  }

  getSystemRoles(user: User): Role[] {
    const { roles } = user;
    return roles.filter(({ folder }) => !folder);
  }

  getFolderRoles(user: User, context: ExecutionContext): Role[] {
    const { key } = this.reflector.get<FolderRoleSpec>("folderRole", context.getHandler());
    const gqlArgs = GqlExecutionContext.create(context).getArgs();

    const folderId = gqlArgs[key];
    if (!folderId) {
      throw new HttpException("Folder ID is required.", HttpStatus.BAD_REQUEST);
    }

    return user.roles.filter(({ folder }) => folder.id === folderId);
  }
}

// If you are wondering about the epic level of shittiness that is this piece
// of coding, I'll just go on record that today I also thought goat cheese is
// lovely buffalo mozzarella.
