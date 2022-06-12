import { Module } from "@nestjs/common";
import { DevToolsService } from "./devTools.service";
import { DevToolsController } from "./devTools.controller";
import { CharacterModule } from "../entities/character/character.module";
import { FolderModule } from "../entities/folder/folder.module";
import { SignatureModule } from "../entities/signature/signature.module";
import { SsoSessionModule } from "../auth/sso/ssoSession/ssoSession.module";
import { MockUserService } from "./mockDataServices/mockUser.service";
import { devToolsEnabled } from "../config";
import { WormholeModule } from "../entities/wormhole/wormhole.module";
import { WormholeService } from "../entities/wormhole/wormhole.service";
import { SessionModule } from "../auth/session/session.module";
import { MockFolderService } from "./mockDataServices/mockFolder.service";

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

@Module(devToolsEnabled ? options : {})
export class DevToolsModule {}
