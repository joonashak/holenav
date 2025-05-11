import { CurrentUser, User } from "@joonashak/nestjs-clone-bay";
import { Controller, Get } from "@nestjs/common";
import { ConnectionGraphDevToolsService } from "./connection-graph-dev-tools/connection-graph-dev-tools.service";
import { DevToolsService } from "./dev-tools.service";

@Controller("dev")
export class DevToolsController {
  constructor(
    private devToolsService: DevToolsService,
    private connectionGraphDevToolsService: ConnectionGraphDevToolsService,
  ) {}

  @Get("reset")
  async reset() {
    await this.devToolsService.resetDatabase();
    return "OK";
  }

  @Get("seed")
  async seed(@CurrentUser() user: User) {
    return this.connectionGraphDevToolsService.reset(user);
  }
}
