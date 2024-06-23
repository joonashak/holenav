import { Module } from "@nestjs/common";
import { FolderAccessControlModule } from "../../access-control/folder/folder-access-control.module";
import { Neo4jModule } from "../../integration/neo4j/neo4j.module";
import { FolderModule } from "../folder/folder.module";
import { FolderService } from "../folder/folder.service";
import { ConnectionMutationService } from "./neo/connection-mutation.service";
import { SignatureMutationService } from "./neo/signature-mutation.service";
import { SignatureSearchService } from "./neo/signature-search.service";
import { SystemMutationService } from "./neo/system-mutation.service";
import { SignatureMaintenanceService } from "./signature-maintenance.service";
import { SignaturePasteService } from "./signature-paste.service";
import { SignatureResolver } from "./signature.resolver";
import { SignatureService } from "./signature.service";

@Module({
  imports: [FolderModule, Neo4jModule, FolderAccessControlModule],
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
    SignatureMaintenanceService,
  ],
})
export class SignatureModule {}
