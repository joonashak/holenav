import { Module } from "@nestjs/common";
import { ConnectionGraphDevToolsService } from "./connection-graph-dev-tools.service";

@Module({
  providers: [ConnectionGraphDevToolsService],
  exports: [ConnectionGraphDevToolsService],
})
export class ConnectionGraphDevToolsModule {}
