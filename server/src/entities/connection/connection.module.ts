import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderAccessControlModule } from "../../access-control/folder/folder-access-control.module";
import { SignatureModule } from "../signature/signature.module";
import { ConnectionGraphResolver } from "./connection-graph.resolver";
import { ConnectionGraphService } from "./connection-graph.service";
import { Connection, ConnectionSchema } from "./connection.model";
import { ConnectionService } from "./connection.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Connection.name, schema: ConnectionSchema },
    ]),
    FolderAccessControlModule,
    forwardRef(() => SignatureModule),
  ],
  providers: [
    ConnectionService,
    ConnectionGraphService,
    ConnectionGraphResolver,
  ],
  exports: [MongooseModule, ConnectionService, ConnectionGraphService],
})
export class ConnectionModule {}
