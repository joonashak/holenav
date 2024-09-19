import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Map, MapSchema } from "./map.model";
import { MapService } from "./map.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Map.name, schema: MapSchema }])],
  providers: [MapService],
  exports: [MongooseModule, MapService],
})
export class MapModule {}
