import { applyDecorators, UseGuards } from "@nestjs/common";
import { TokenAuthGuard } from "../guards/token-auth.guard";

const RequireAuth = () => applyDecorators(UseGuards(TokenAuthGuard));

export default RequireAuth;
