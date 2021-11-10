import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SsoSession, SsoSessionSchema } from "./ssoSession.model";
import { SsoSessionService } from "./ssoSession.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: SsoSession.name, schema: SsoSessionSchema }])],
  providers: [SsoSessionService],
  exports: [SsoSessionService, MongooseModule],
})
export class SsoSessionModule {}
