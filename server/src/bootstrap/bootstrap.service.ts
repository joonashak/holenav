import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapService.name);

  async onApplicationBootstrap() {
    this.logger.log("Running BootstrapModule.");
  }
}
