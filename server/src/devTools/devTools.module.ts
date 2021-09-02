import { Module } from "@nestjs/common";
import { DevToolsService } from "./devTools.service";
import { DevToolsController } from "./devTools.controller";

@Module({
  providers: [DevToolsService],
  controllers: [DevToolsController],
})
export class DevToolsModule {}
