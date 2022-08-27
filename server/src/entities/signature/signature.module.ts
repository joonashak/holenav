import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../folder/folder.module";
import { FolderService } from "../folder/folder.service";
import { SignatureOLD, SignatureSchema } from "./signature-OLD.model";
import { SignatureResolver } from "./signature.resolver";
import { SignatureService } from "./services/signature.service";
import { WormholeService } from "./services/wormhole.service";
import { SignatureNode } from "./services/signature.node";
import { Neo4jModule } from "../../integration/neo4j/neo4j.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SignatureOLD.name, schema: SignatureSchema }]),
    FolderModule,
    Neo4jModule,
  ],
  exports: [MongooseModule, SignatureService, WormholeService, SignatureNode],
  providers: [SignatureResolver, SignatureService, FolderService, WormholeService, SignatureNode],
})
export class SignatureModule {}
