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
import { Neo4jModule } from "./integration/neo4j/neo4j.module";
import { ConnectionGraphModule } from "./connection-graph/connection-graph.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ScheduledTasksModule } from "./scheduled-tasks/scheduled-tasks.module";
import { ScheduleModule } from "@nestjs/schedule";

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
    Neo4jModule,
    AppDataModule,
    BootstrapModule,
    SystemModule,
    AuthModule,
    CharacterModule,
    FolderModule,
    SignatureModule,
    DevToolsModule,
    ConnectionGraphModule,
    ScheduledTasksModule,
  ],
})
export class AppModule {}
