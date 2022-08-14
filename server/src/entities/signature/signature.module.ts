import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../folder/folder.module";
import { FolderService } from "../folder/folder.service";
import { Signature, SignatureSchema } from "./signature.model";
import { SignatureResolver } from "./signature.resolver";
import { SignatureService } from "./services/signature.service";
import { WormholeService } from "./services/wormhole.service";
import { ConnectionTreeService } from "./services/connection-tree.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signature.name, schema: SignatureSchema }]),
    FolderModule,
  ],
  exports: [MongooseModule, SignatureService, WormholeService, ConnectionTreeService],
  providers: [
    SignatureResolver,
    SignatureService,
    FolderService,
    WormholeService,
    ConnectionTreeService,
  ],
})
export class SignatureModule {}
