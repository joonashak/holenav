import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderAccessControlModule } from "../../access-control/folder/folder-access-control.module";
import { ConnectionModule } from "../connection/connection.module";
import { FolderModule } from "../folder/folder.module";
import { FolderService } from "../folder/folder.service";
import { SignaturePasteService } from "./signature-paste.service";
import { Signature, SignatureSchema } from "./signature.model";
import { SignatureResolver } from "./signature.resolver";
import { SignatureService } from "./signature.service";

@Module({
  imports: [
    FolderModule,
    FolderAccessControlModule,
    ConnectionModule,
    MongooseModule.forFeature([
      { name: Signature.name, schema: SignatureSchema },
    ]),
  ],
  providers: [
    SignatureResolver,
    SignatureService,
    SignaturePasteService,
    FolderService,
    CloneBayUserService,
  ],
  exports: [SignatureService, MongooseModule],
})
export class SignatureModule {}
