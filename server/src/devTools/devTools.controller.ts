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

  @Get("seed")
  async seed() {
    await this.devToolsService.seedDatabase();
    return "OK";
  }

  @Get("mockUsers")
  async mockUsers() {
    return this.devToolsService.getMockUsers();
  }

  // FIXME: testing
  @Get("mockWormholes")
  async mockWormholes() {
    await this.devToolsService.mockWormholes();
    return "OK";
  }
}
