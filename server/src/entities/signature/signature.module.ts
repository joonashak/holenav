import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../folder/folder.module";
import { FolderService } from "../folder/folder.service";
import { SignatureOLD, SignatureSchema } from "./signature-OLD.model";
import { SignatureResolver } from "./signature.resolver";
import { SignatureService } from "./signature.service";
import { Neo4jModule } from "../../integration/neo4j/neo4j.module";
import { SystemMutationService } from "./neo/system-mutation.service";
import { SignatureSearchService } from "./neo/signature-search.service";
import { SignatureMutationService } from "./neo/signature-mutation.service";
import { ConnectionMutationService } from "./neo/connection-mutation.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SignatureOLD.name, schema: SignatureSchema }]),
    FolderModule,
    Neo4jModule,
  ],
  exports: [
    MongooseModule,
    SignatureService,
    SystemMutationService,
    SignatureSearchService,
    SignatureMutationService,
    ConnectionMutationService,
  ],
  providers: [
    SignatureResolver,
    SignatureService,
    FolderService,
    SystemMutationService,
    SignatureSearchService,
    SignatureMutationService,
    ConnectionMutationService,
  ],
})
export class SignatureModule {}
