import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SsoState, SsoStateSchema } from "./ssoState.model";
import { SsoStateService } from "./ssoState.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: SsoState.name, schema: SsoStateSchema }])],
  providers: [SsoStateService],
  exports: [SsoStateService, MongooseModule],
})
export class SsoStateModule {}
