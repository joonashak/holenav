import { Module } from "@nestjs/common";
import { ConnectionModule } from "./connection/connection.module";
import { FolderModule } from "./folder/folder.module";
import { MapModule } from "./map/map.module";
import { SignatureModule } from "./signature/signature.module";
import { SystemModule } from "./system/system.module";

@Module({
  imports: [
    FolderModule,
    MapModule,
    SignatureModule,
    SystemModule,
    ConnectionModule,
  ],
  exports: [
    FolderModule,
    MapModule,
    SignatureModule,
    SystemModule,
    ConnectionModule,
  ],
})
export class EntitiesModule {}
