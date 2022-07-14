import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../folder/folder.module";
import { FolderService } from "../folder/folder.service";
import { WormholeModule } from "../wormhole/wormhole.module";
import { WormholeService } from "../wormhole/wormhole.service";
import { Signature, SignatureSchema } from "./signature.model";
import { SignatureResolver } from "./signature.resolver";
import { SignatureService } from "./signature.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signature.name, schema: SignatureSchema }]),
    FolderModule,
    forwardRef(() => WormholeModule),
  ],
  exports: [MongooseModule, SignatureService],
  providers: [SignatureResolver, SignatureService, FolderService, WormholeService],
})
export class SignatureModule {}
