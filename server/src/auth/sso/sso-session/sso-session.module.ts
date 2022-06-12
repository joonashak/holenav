import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SsoSession, SsoSessionSchema } from "./sso-session.model";
import { SsoSessionService } from "./sso-session.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: SsoSession.name, schema: SsoSessionSchema }])],
  providers: [SsoSessionService],
  exports: [SsoSessionService, MongooseModule],
})
export class SsoSessionModule {}
