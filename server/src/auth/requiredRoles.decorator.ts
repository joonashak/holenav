import { SetMetadata } from "@nestjs/common";
import Roles from "../role/roles.enum";

export const RequiredRole = (role: Roles) => SetMetadata("requiredRole", role);
