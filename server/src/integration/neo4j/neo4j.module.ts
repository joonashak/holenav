import { Module } from "@nestjs/common";
import { Neo4jService } from "./neo4j.service";

@Module({
  exports: [Neo4jService],
  providers: [Neo4jService],
})
export class Neo4jModule {}
