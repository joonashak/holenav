import { Module } from "@nestjs/common";
import { Neo4jModule } from "../integration/neo4j/neo4j.module";
import { ConnectionGraphController } from "./connection-graph.controller";
import { ConnectionGraphService } from "./connection-graph.service";
import { ConnectionTreeService } from "./connection-tree.service";

@Module({
  imports: [Neo4jModule],
  exports: [ConnectionGraphService, ConnectionTreeService],
  providers: [ConnectionGraphService, ConnectionTreeService],
  controllers: [ConnectionGraphController],
})
export class ConnectionGraphModule {}
