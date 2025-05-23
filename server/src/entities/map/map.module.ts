import { CloneBayModule } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Map, MapSchema } from "./map.model";
import { MapResolver } from "./map.resolver";
import { MapService } from "./map.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Map.name, schema: MapSchema }]),
    CloneBayModule.forChildren(),
  ],
  providers: [MapService, MapResolver],
  exports: [MongooseModule, MapService],
})
export class MapModule {}
