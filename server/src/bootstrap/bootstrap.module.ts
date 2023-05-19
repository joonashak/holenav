import { Module } from "@nestjs/common";
import { AppDataModule } from "../app-data/app-data.module";
import { BootstrapService } from "./bootstrap.service";
import { AppUpdateService } from "./services/app-update.service";

/**
 * Take care of stuff that needs to happen on server startup.
 */
@Module({ imports: [AppDataModule], providers: [BootstrapService, AppUpdateService] })
export class BootstrapModule {}
