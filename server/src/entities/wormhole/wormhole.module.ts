import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wormhole, WormholeSchema } from "./wormhole.model";
import { WormholeService } from "./wormhole.service";
import { WormholeResolver } from "./wormhole.resolver";

@Module({
  imports: [MongooseModule.forFeature([{ name: Wormhole.name, schema: WormholeSchema }])],
  exports: [MongooseModule],
  providers: [WormholeService, WormholeResolver],
})
export class WormholeModule {}
