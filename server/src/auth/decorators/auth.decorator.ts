import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";

const RequireAuth = () => applyDecorators(UseGuards(AuthGuard));

export default RequireAuth;
