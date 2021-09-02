import { Controller, Get } from "@nestjs/common";
import { DevToolsService } from "./devTools.service";

@Controller("dev")
export class DevToolsController {
  constructor(private devToolsService: DevToolsService) {}

  @Get("reset")
  async reset() {
    await this.devToolsService.resetDatabase();
    return "OK";
  }
}
