import { CloneBayMockingModule } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { ENABLE_DEVTOOLS } from "../config";
import { FolderModule } from "../entities/folder/folder.module";
import { SignatureModule } from "../entities/signature/signature.module";
import { DevToolsController } from "./dev-tools.controller";
import { DevToolsService } from "./dev-tools.service";
import { MockFolderService } from "./mock-data-services/mock-folder.service";

const options = {
  imports: [FolderModule, SignatureModule, CloneBayMockingModule],
  providers: [DevToolsService, MockFolderService],
  controllers: [DevToolsController],
};

@Module(ENABLE_DEVTOOLS ? options : {})
export class DevToolsModule {}
