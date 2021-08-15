import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "./system.model";
import { SystemService } from "./system.service";
import { SystemResolver } from "./system.resolver";

@Module({
  imports: [MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }])],
  providers: [SystemService, SystemResolver],
})
export class SystemModule {}
