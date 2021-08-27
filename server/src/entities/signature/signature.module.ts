import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Signature, SignatureSchema } from "./signature.model";
import { SignatureResolver } from "./signature.resolver";

@Module({
  imports: [MongooseModule.forFeature([{ name: Signature.name, schema: SignatureSchema }])],
  exports: [MongooseModule],
  providers: [SignatureResolver],
})
export class SignatureModule {}
