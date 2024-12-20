import { CloneBayMockingModule } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { SessionModule } from "../auth/session/session.module";
import { SsoSessionModule } from "../auth/sso/sso-session/sso-session.module";
import { ENABLE_DEVTOOLS } from "../config";
import { CharacterModule } from "../entities/character/character.module";
import { FolderModule } from "../entities/folder/folder.module";
import { SignatureModule } from "../entities/signature/signature.module";
import { DevToolsController } from "./dev-tools.controller";
import { DevToolsService } from "./dev-tools.service";
import { MockFolderService } from "./mock-data-services/mock-folder.service";
import { MockUserService } from "./mock-data-services/mock-user.service";

const options = {
  imports: [
    CharacterModule,
    FolderModule,
    SignatureModule,
    SsoSessionModule,
    SessionModule,
    CloneBayMockingModule,
  ],
  providers: [DevToolsService, MockUserService, MockFolderService],
  controllers: [DevToolsController],
};

@Module(ENABLE_DEVTOOLS ? options : {})
export class DevToolsModule {}
