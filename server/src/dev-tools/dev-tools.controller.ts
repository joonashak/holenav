import { Controller, Get } from "@nestjs/common";
import { DevToolsService } from "./dev-tools.service";

@Controller("dev")
export class DevToolsController {
  constructor(private devToolsService: DevToolsService) {}

  @Get("reset")
  async reset() {
    await this.devToolsService.resetDatabase();
    return "OK";
  }
}
