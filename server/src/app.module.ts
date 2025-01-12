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
import { BootstrapModule } from "./bootstrap/bootstrap.module";
import {
  CLIENT_URL,
  MONGO_URL,
  SSO_CALLBACK_URL,
  SSO_CLIENT_ID,
  SSO_SECRET_KEY,
} from "./config";
import { DevToolsModule } from "./dev-tools/dev-tools.module";
import { EntitiesModule } from "./entities/entities.module";
import { EsiModule } from "./esi/esi.module";
import { FrontendModule } from "./frontend/frontend.module";
import graphQlModuleConfig from "./graphql-module-config";
import { UserPreferencesModule } from "./user/user-preferences/user-preferences.module";

@Module({
  imports: [
    AppDataModule,
    BootstrapModule,
    CloneBayModule.forRoot({
      afterLoginUrl: CLIENT_URL,
    }),
    CloneBayResolversModule,
    CloneBaySsoModule,
    DevToolsModule,
    EntitiesModule,
    EsiModule,
    EveAuthModule.forRoot({
      clientId: SSO_CLIENT_ID,
      secretKey: SSO_SECRET_KEY,
      callbackUrl: SSO_CALLBACK_URL,
      scopes: ["esi-search.search_structures.v1"],
    }),
    FolderAccessControlModule,
    FrontendModule,
    GraphQLModule.forRoot<ApolloDriverConfig>(graphQlModuleConfig),
    MongooseModule.forRoot(MONGO_URL),
    ScheduleModule.forRoot(),
    UserPreferencesModule,
  ],
})
export class AppModule {}
