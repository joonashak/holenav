import { Module } from "@nestjs/common";
import { AppDataModule } from "../entities/app-data/app-data.module";
import { BootstrapService } from "./bootstrap.service";

/**
 * Take care of stuff that needs to happen on server startup.
 */
@Module({ imports: [AppDataModule], providers: [BootstrapService] })
export class BootstrapModule {}
