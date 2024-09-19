import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Map, MapSchema } from "./map.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: Map.name, schema: MapSchema }])],
  exports: [MongooseModule],
})
export class MapModule {}
