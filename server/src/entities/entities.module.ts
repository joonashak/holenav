import { Module } from "@nestjs/common";
import { CharacterModule } from "./character/character.module";
import { FolderModule } from "./folder/folder.module";
import { MapModule } from "./map/map.module";
import { SignatureModule } from "./signature/signature.module";
import { SystemModule } from "./system/system.module";

@Module({
  imports: [
    CharacterModule,
    FolderModule,
    MapModule,
    SignatureModule,
    SystemModule,
  ],
  exports: [
    CharacterModule,
    FolderModule,
    MapModule,
    SignatureModule,
    SystemModule,
  ],
})
export class EntitiesModule {}
