import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SystemModule } from "./entities/system/system.module";

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL), SystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
