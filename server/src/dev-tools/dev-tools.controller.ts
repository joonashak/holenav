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

  // TODO: Replace with more granular methods.
  @Get("seed")
  async seed() {
    await this.devToolsService.seedDatabase();
    return "OK";
  }

  // TODO: Replace with mock ESI?
  @Get("mockUsers")
  async mockUsers() {
    return this.devToolsService.getMockUsers();
  }
}
