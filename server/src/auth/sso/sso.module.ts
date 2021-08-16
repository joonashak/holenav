import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SsoService } from "./sso.service";
import { SsoState, SsoStateSchema } from "./ssoState.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: SsoState.name, schema: SsoStateSchema }])],
  providers: [SsoService],
})
export class SsoModule {}
