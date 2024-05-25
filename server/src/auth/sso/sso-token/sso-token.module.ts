import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SsoToken, SsoTokenSchema } from "./sso-token.model";
import { SsoTokenService } from "./sso-token.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SsoToken.name, schema: SsoTokenSchema },
    ]),
  ],
  providers: [SsoTokenService],
  exports: [SsoTokenService, MongooseModule],
})
export class SsoTokenModule {}
