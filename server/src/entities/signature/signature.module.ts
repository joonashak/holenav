import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Signature, SignatureSchema } from "./signature.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: Signature.name, schema: SignatureSchema }])],
  exports: [MongooseModule],
})
export class SignatureModule {}
