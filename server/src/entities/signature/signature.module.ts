import { Module } from "@nestjs/common";
import { FolderModule } from "../folder/folder.module";
import { FolderService } from "../folder/folder.service";
import { SignatureResolver } from "./signature.resolver";
import { SignatureService } from "./signature.service";
import { Neo4jModule } from "../../integration/neo4j/neo4j.module";
import { SystemMutationService } from "./neo/system-mutation.service";
import { SignatureSearchService } from "./neo/signature-search.service";
import { SignatureMutationService } from "./neo/signature-mutation.service";
import { ConnectionMutationService } from "./neo/connection-mutation.service";
import { SignaturePasteService } from "./signature-paste.service";

@Module({
  imports: [FolderModule, Neo4jModule],
  exports: [
    SignatureService,
    SystemMutationService,
    SignatureSearchService,
    SignatureMutationService,
    ConnectionMutationService,
  ],
  providers: [
    SignatureResolver,
    SignatureService,
    SignaturePasteService,
    FolderService,
    SystemMutationService,
    SignatureSearchService,
    SignatureMutationService,
    ConnectionMutationService,
  ],
})
export class SignatureModule {}
