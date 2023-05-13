import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { AppDataModule } from "./app-data/app-data.module";
import { AuthModule } from "./auth/auth.module";
import { BootstrapModule } from "./bootstrap/bootstrap.module";
import { CLIENT_URL, MONGO_URL } from "./config";
import { ConnectionGraphModule } from "./connection-graph/connection-graph.module";
import { DevToolsModule } from "./dev-tools/dev-tools.module";
import { CharacterModule } from "./entities/character/character.module";
import { FolderModule } from "./entities/folder/folder.module";
import { SignatureModule } from "./entities/signature/signature.module";
import { SystemModule } from "./entities/system/system.module";
import { EsiModule } from "./esi/esi.module";
import { Neo4jModule } from "./integration/neo4j/neo4j.module";
import { ScheduledTasksModule } from "./scheduled-tasks/scheduled-tasks.module";

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, { useFindAndModify: false }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      playground: true,
      debug: false,
      cors: { origin: CLIENT_URL },
    }),
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
  ],
})
export class AppModule {}
