import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wormhole, WormholeSchema } from "./wormhole.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: Wormhole.name, schema: WormholeSchema }])],
  exports: [MongooseModule],
})
export class WormholeModule {}
