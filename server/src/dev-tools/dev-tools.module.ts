import { CloneBayMockingModule } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { ENABLE_DEVTOOLS } from "../config";
import { DevToolsController } from "./dev-tools.controller";
import { DevToolsService } from "./dev-tools.service";

const options = {
  imports: [CloneBayMockingModule],
  providers: [DevToolsService],
  controllers: [DevToolsController],
};

@Module(ENABLE_DEVTOOLS ? options : {})
export class DevToolsModule {}
