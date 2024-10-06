import { Module } from "@nestjs/common";
import { FolderAccessControlModule } from "../../access-control/folder/folder-access-control.module";
import { FolderModule } from "../folder/folder.module";
import { FolderService } from "../folder/folder.service";
import { SignaturePasteService } from "./signature-paste.service";
import { SignatureResolver } from "./signature.resolver";
import { SignatureService } from "./signature.service";

@Module({
  imports: [FolderModule, FolderAccessControlModule],
  exports: [SignatureService],
  providers: [
    SignatureResolver,
    SignatureService,
    SignaturePasteService,
    FolderService,
  ],
})
export class SignatureModule {}
