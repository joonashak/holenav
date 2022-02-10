import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { SystemModule } from "./entities/system/system.module";
import { AuthModule } from "./auth/auth.module";
import { CharacterModule } from "./entities/character/character.module";
import { DataMigrationModule } from "./dataMigration/dataMigration.module";
import { FolderModule } from "./entities/folder/folder.module";
import { SignatureModule } from "./entities/signature/signature.module";
import { DevToolsModule } from "./devTools/devTools.module";
import { clientUrl, databaseUrl } from "./config";
import { WormholeModule } from "./entities/wormhole/wormhole.module";

@Module({
  imports: [
    MongooseModule.forRoot(databaseUrl, { useFindAndModify: false }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: false,
      cors: { origin: clientUrl },
    }),
    SystemModule,
    AuthModule,
    CharacterModule,
    DataMigrationModule,
    FolderModule,
    SignatureModule,
    DevToolsModule,
    WormholeModule,
  ],
})
export class AppModule {}
