import {
  CloneBayModule,
  CloneBayResolversModule,
  CloneBaySsoModule,
} from "@joonashak/nestjs-clone-bay";
import { EveAuthModule } from "@joonashak/nestjs-eve-auth";
import { ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { FolderAccessControlModule } from "./access-control/folder/folder-access-control.module";
import { AppDataModule } from "./app-data/app-data.module";
import { AuthModule } from "./auth/auth.module";
import { BootstrapModule } from "./bootstrap/bootstrap.module";
import {
  CLIENT_URL,
  MONGO_URL,
  SSO_CALLBACK_URL,
  SSO_CLIENT_ID,
  SSO_SECRET_KEY,
} from "./config";
import { ConnectionGraphModule } from "./connection-graph/connection-graph.module";
import { DevToolsModule } from "./dev-tools/dev-tools.module";
import { CharacterModule } from "./entities/character/character.module";
import { FolderModule } from "./entities/folder/folder.module";
import { SignatureModule } from "./entities/signature/signature.module";
import { SystemModule } from "./entities/system/system.module";
import { EsiModule } from "./esi/esi.module";
import { FrontendModule } from "./frontend/frontend.module";
import graphQlModuleConfig from "./graphql-module-config";
import { Neo4jModule } from "./integration/neo4j/neo4j.module";
import { ScheduledTasksModule } from "./scheduled-tasks/scheduled-tasks.module";
import { UserPreferencesModule } from "./user/user-preferences/user-preferences.module";

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphQlModuleConfig),
    EveAuthModule.forRoot({
      clientId: SSO_CLIENT_ID,
      secretKey: SSO_SECRET_KEY,
      callbackUrl: SSO_CALLBACK_URL,
      scopes: ["esi-search.search_structures.v1"],
    }),
    CloneBayModule.forRoot({
      afterLoginUrl: CLIENT_URL,
    }),
    CloneBaySsoModule,
    CloneBayResolversModule,
    ScheduleModule.forRoot(),
    AppDataModule,
    AuthModule,
    BootstrapModule,
    CharacterModule,
    ConnectionGraphModule,
    DevToolsModule,
    EsiModule,
    FolderModule,
    Neo4jModule,
    ScheduledTasksModule,
    SignatureModule,
    SystemModule,
    FrontendModule,
    UserPreferencesModule,
    FolderAccessControlModule,
  ],
})
export class AppModule {}
