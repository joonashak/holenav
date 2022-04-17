import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import SystemRoles from "../../user/roles/systemRoles.enum";

export const requiredSystemRoleKey = "requiredSystemRole";

@Injectable()
export class SystemRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.getRequiredRole(context);
    const userSystemRole = this.getSystemRole(context);
    return requiredRole <= userSystemRole;
  }

  private getRequiredRole(context: ExecutionContext): SystemRoles {
    const requiredRole = this.reflector.get<SystemRoles>(
      requiredSystemRoleKey,
      context.getHandler(),
    );

    if (!requiredRole) {
      throw new HttpException(
        "Required system role not configured.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return requiredRole;
  }

  private getSystemRole(context: ExecutionContext): SystemRoles {
    const gqlContext = GqlExecutionContext.create(context);
    const { user } = gqlContext.getContext().req;
    const { systemRole } = user;

    if (!Object.values(SystemRoles).includes(systemRole as SystemRoles)) {
      throw new HttpException("Invalid system role.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return systemRole;
  }
}
