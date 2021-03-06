import { Module } from "@nestjs/common";
import { DevToolsService } from "./dev-tools.service";
import { DevToolsController } from "./dev-tools.controller";
import { CharacterModule } from "../entities/character/character.module";
import { FolderModule } from "../entities/folder/folder.module";
import { SignatureModule } from "../entities/signature/signature.module";
import { SsoSessionModule } from "../auth/sso/sso-session/sso-session.module";
import { MockUserService } from "./mock-data-services/mock-user.service";
import { ENABLE_DEVTOOLS } from "../config";
import { WormholeModule } from "../entities/wormhole/wormhole.module";
import { WormholeService } from "../entities/wormhole/wormhole.service";
import { SessionModule } from "../auth/session/session.module";
import { MockFolderService } from "./mock-data-services/mock-folder.service";

const options = {
  imports: [
    CharacterModule,
    FolderModule,
    SignatureModule,
    SsoSessionModule,
    WormholeModule,
    SessionModule,
  ],
  providers: [DevToolsService, MockUserService, MockFolderService, WormholeService],
  controllers: [DevToolsController],
};

@Module(ENABLE_DEVTOOLS ? options : {})
export class DevToolsModule {}
