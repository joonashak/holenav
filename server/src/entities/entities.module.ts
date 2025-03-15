import { Module } from "@nestjs/common";
import { ConnectionModule } from "./connection/connection.module";
import { FolderModule } from "./folder/folder.module";
import { MapModule } from "./map/map.module";
import { SignatureModule } from "./signature/signature.module";

@Module({
  imports: [FolderModule, MapModule, SignatureModule, ConnectionModule],
  exports: [FolderModule, MapModule, SignatureModule, ConnectionModule],
})
export class EntitiesModule {}
