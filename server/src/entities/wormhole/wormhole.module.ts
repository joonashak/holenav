import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wormhole, WormholeSchema } from "./wormhole.model";
import { WormholeService } from "./wormhole.service";
import { WormholeResolver } from "./wormhole.resolver";
import { FolderService } from "../folder/folder.service";
import { FolderModule } from "../folder/folder.module";
import { ConnectionTreeService } from "./connection-tree.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wormhole.name, schema: WormholeSchema }]),
    FolderModule,
  ],
  exports: [MongooseModule],
  providers: [WormholeService, WormholeResolver, FolderService, ConnectionTreeService],
})
export class WormholeModule {}
