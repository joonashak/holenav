import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SystemModule } from "./entities/system/system.module";
import { AuthModule } from "./auth/auth.module";
import { CharacterModule } from "./entities/character/character.module";
import { DataMigrationModule } from "./dataMigration/dataMigration.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL, { useFindAndModify: false }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: false,
      cors: { origin: process.env.CLIENT_URL },
    }),
    SystemModule,
    AuthModule,
    CharacterModule,
    DataMigrationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
