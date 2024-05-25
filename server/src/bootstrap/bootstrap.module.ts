import { Module } from "@nestjs/common";
import { BootstrapService } from "./bootstrap.service";
import { AppUpdateService } from "./services/app-update.service";

/** Take care of stuff that needs to happen on server startup. */
@Module({ providers: [BootstrapService, AppUpdateService] })
export class BootstrapModule {}
