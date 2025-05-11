import { CloneBayMockingModule } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { ENABLE_DEVTOOLS } from "../config";
import { ConnectionGraphDevToolsModule } from "./connection-graph-dev-tools/connection-graph-dev-tools.module";
import { DevToolsController } from "./dev-tools.controller";
import { DevToolsService } from "./dev-tools.service";

const options = {
  imports: [CloneBayMockingModule, ConnectionGraphDevToolsModule],
  providers: [DevToolsService],
  controllers: [DevToolsController],
};

@Module(ENABLE_DEVTOOLS ? options : {})
export class DevToolsModule {}
