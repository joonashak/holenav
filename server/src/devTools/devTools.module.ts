import { Module } from "@nestjs/common";
import { DevToolsService } from "./devTools.service";
import { DevToolsController } from "./devTools.controller";
import { CharacterModule } from "../entities/character/character.module";
import { DataMigrationModule } from "../dataMigration/dataMigration.module";
import { FolderModule } from "../entities/folder/folder.module";
import { RoleModule } from "../role/role.module";
import { SignatureModule } from "../entities/signature/signature.module";
import { SsoStateModule } from "../auth/sso/ssoState/ssoState.module";
import { UserModule } from "../user/user.module";
import { MockUserService } from "./mockUser.service";
import { devToolsEnabled } from "../config";

const options = {
  imports: [
    CharacterModule,
    DataMigrationModule,
    FolderModule,
    RoleModule,
    SignatureModule,
    SsoStateModule,
    UserModule,
  ],
  providers: [DevToolsService, MockUserService],
  controllers: [DevToolsController],
};

@Module(devToolsEnabled ? options : {})
export class DevToolsModule {}
