import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connection, ConnectionSchema } from "./connection.model";
import { ConnectionResolver } from "./connection.resolver";
import { ConnectionService } from "./connection.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Connection.name, schema: ConnectionSchema },
    ]),
  ],
  providers: [ConnectionService, ConnectionResolver],
  exports: [MongooseModule, ConnectionService],
})
export class ConnectionModule {}
