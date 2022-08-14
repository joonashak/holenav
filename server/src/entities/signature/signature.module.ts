import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../folder/folder.module";
import { FolderService } from "../folder/folder.service";
import { Signature, SignatureSchema } from "./signature.model";
import { SignatureResolver } from "./signature.resolver";
import { SignatureService } from "./signature.service";
import { WormholeService } from "./wormhole.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signature.name, schema: SignatureSchema }]),
    FolderModule,
  ],
  exports: [MongooseModule, SignatureService, WormholeService],
  providers: [SignatureResolver, SignatureService, FolderService, WormholeService],
})
export class SignatureModule {}
