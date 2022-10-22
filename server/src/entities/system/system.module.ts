import { Module } from "@nestjs/common";
import { SystemResolver } from "./system.resolver";
import { SystemMutationService } from "../signature/neo/system-mutation.service";
import { Neo4jModule } from "../../integration/neo4j/neo4j.module";

@Module({
  imports: [Neo4jModule],
  providers: [SystemMutationService, SystemResolver],
})
export class SystemModule {}
