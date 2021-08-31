import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../entities/folder/folder.module";
import { SignatureModule } from "../entities/signature/signature.module";
import { SignatureService } from "../entities/signature/signature.service";
import { DataMigration, DataMigrationSchema } from "./dataMigration.model";
import { DataMigrationService } from "./dataMigration.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DataMigration.name, schema: DataMigrationSchema }]),
    FolderModule,
    SignatureModule,
  ],
  providers: [DataMigrationService, SignatureService],
})
export class DataMigrationModule {}
