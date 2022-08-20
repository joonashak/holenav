import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { SystemModule } from "./entities/system/system.module";
import { AuthModule } from "./auth/auth.module";
import { CharacterModule } from "./entities/character/character.module";
import { FolderModule } from "./entities/folder/folder.module";
import { SignatureModule } from "./entities/signature/signature.module";
import { DevToolsModule } from "./dev-tools/dev-tools.module";
import { CLIENT_URL, MONGO_URL } from "./config";
import { BootstrapModule } from "./bootstrap/bootstrap.module";
import { AppDataModule } from "./app-data/app-data.module";

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, { useFindAndModify: false }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: false,
      cors: { origin: CLIENT_URL },
    }),
    AppDataModule,
    BootstrapModule,
    SystemModule,
    AuthModule,
    CharacterModule,
    FolderModule,
    SignatureModule,
    DevToolsModule,
  ],
})
export class AppModule {}
