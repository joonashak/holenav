import { Global, Module } from "@nestjs/common";
import { SystemResolver } from "./system.resolver";
import { UserService } from "../../user/user.service";
import { CharacterModule } from "../character/character.module";
import { UserModule } from "../../user/user.module";
import { SystemNode } from "../signature/neo/system.node";
import { Neo4jModule } from "../../integration/neo4j/neo4j.module";

@Global()
@Module({
  imports: [CharacterModule, UserModule, Neo4jModule],
  providers: [SystemNode, SystemResolver, UserService],
  exports: [UserService],
})
export class SystemModule {}
