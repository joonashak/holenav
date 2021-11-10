import { Module } from "@nestjs/common";
import { DevToolsService } from "./devTools.service";
import { DevToolsController } from "./devTools.controller";
import { CharacterModule } from "../entities/character/character.module";
import { DataMigrationModule } from "../dataMigration/dataMigration.module";
import { FolderModule } from "../entities/folder/folder.module";
import { RoleModule } from "../role/role.module";
import { SignatureModule } from "../entities/signature/signature.module";
import { SsoSessionModule } from "../auth/sso/ssoSession/ssoSession.module";
import { MockUserService } from "./mockUser.service";
import { devToolsEnabled } from "../config";
import { WormholeModule } from "../entities/wormhole/wormhole.module";
import { WormholeService } from "../entities/wormhole/wormhole.service";

const options = {
  imports: [
    CharacterModule,
    DataMigrationModule,
    FolderModule,
    RoleModule,
    SignatureModule,
    SsoSessionModule,
    WormholeModule,
  ],
  providers: [DevToolsService, MockUserService, WormholeService],
  controllers: [DevToolsController],
};

@Module(devToolsEnabled ? options : {})
export class DevToolsModule {}
