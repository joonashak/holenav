import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { SsoModule } from "./sso/sso.module";
import { SsoService } from "./sso/sso.service";

@Module({
  controllers: [AuthController],
  imports: [SsoModule],
  providers: [SsoService],
})
export class AuthModule {}
