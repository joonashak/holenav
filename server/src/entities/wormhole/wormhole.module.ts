import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wormhole, WormholeSchema } from "./wormhole.model";
import { WormholeService } from "./wormhole.service";
import { WormholeResolver } from "./wormhole.resolver";
import { FolderService } from "../folder/folder.service";
import { FolderModule } from "../folder/folder.module";
import { ConnectionTreeService } from "./connection-tree.service";
import { SignatureService } from "../signature/signature.service";
import { SignatureModule } from "../signature/signature.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wormhole.name, schema: WormholeSchema }]),
    FolderModule,
    forwardRef(() => SignatureModule),
  ],
  exports: [MongooseModule, WormholeService],
  providers: [
    WormholeService,
    WormholeResolver,
    FolderService,
    ConnectionTreeService,
    SignatureService,
  ],
})
export class WormholeModule {}
