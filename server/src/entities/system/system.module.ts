import { Module } from "@nestjs/common";
import { SystemResolver } from "./system.resolver";
import { SystemNode } from "../signature/neo/system.node";
import { Neo4jModule } from "../../integration/neo4j/neo4j.module";

@Module({
  imports: [Neo4jModule],
  providers: [SystemNode, SystemResolver],
})
export class SystemModule {}
