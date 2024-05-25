import { applyDecorators, UseGuards } from "@nestjs/common";
import { TokenAuthGuard } from "../guards/token-auth.guard";
import { DevKeyGuard } from "../guards/dev-key.guard";

const RequireAuth = () =>
  applyDecorators(UseGuards(TokenAuthGuard, DevKeyGuard));

export default RequireAuth;
