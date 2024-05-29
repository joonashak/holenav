import { AuthenticationError } from "@nestjs/apollo";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import SystemRole from "../../user/roles/system-role.enum";

export const requiredSystemRoleKey = "requiredSystemRole";

@Injectable()
export class SystemRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.getRequiredRole(context);
    const userSystemRole = this.getSystemRole(context);
    return requiredRole <= userSystemRole;
  }

  private getRequiredRole(context: ExecutionContext): SystemRole {
    const requiredRole = this.reflector.get<SystemRole>(
      requiredSystemRoleKey,
      context.getHandler(),
    );

    if (!requiredRole) {
      throw new InternalServerErrorException(
        "Required system role not configured.",
      );
    }

    return requiredRole;
  }

  private getSystemRole(context: ExecutionContext): SystemRole {
    const gqlContext = GqlExecutionContext.create(context);
    const { user } = gqlContext.getContext().req;
    const { systemRole } = user;

    if (!Object.values(SystemRole).includes(systemRole as SystemRole)) {
      throw new AuthenticationError("Invalid system role.");
    }

    return systemRole;
  }
}
