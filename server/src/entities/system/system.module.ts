import { Module } from "@nestjs/common";
import { FolderAccessControlModule } from "../../access-control/folder/folder-access-control.module";
import { Neo4jModule } from "../../integration/neo4j/neo4j.module";
import { SystemMutationService } from "../signature/neo/system-mutation.service";
import { SystemResolver } from "./system.resolver";

@Module({
  imports: [Neo4jModule, FolderAccessControlModule],
  providers: [SystemMutationService, SystemResolver],
})
export class SystemModule {}
