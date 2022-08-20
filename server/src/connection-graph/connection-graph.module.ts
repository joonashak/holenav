import { Module } from "@nestjs/common";
import { Neo4jModule } from "../integration/neo4j/neo4j.module";
import { ConnectionGraphService } from "./connection-graph.service";

@Module({
  imports: [Neo4jModule],
  exports: [ConnectionGraphService],
  providers: [ConnectionGraphService],
})
export class ConnectionGraphModule {}
