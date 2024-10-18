import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConnectionGraphResolver } from "./connection-graph.resolver";
import { ConnectionGraphService } from "./connection-graph.service";
import { Connection, ConnectionSchema } from "./connection.model";
import { ConnectionResolver } from "./connection.resolver";
import { ConnectionService } from "./connection.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Connection.name, schema: ConnectionSchema },
    ]),
  ],
  providers: [
    ConnectionService,
    ConnectionResolver,
    ConnectionGraphService,
    ConnectionGraphResolver,
  ],
  exports: [MongooseModule, ConnectionService, ConnectionGraphService],
})
export class ConnectionModule {}
