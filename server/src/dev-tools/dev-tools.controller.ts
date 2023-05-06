import { Controller, Get, UseGuards } from "@nestjs/common";
import { DevToolsService } from "./dev-tools.service";
import { DevKeyGuard } from "../auth/guards/dev-key.guard";

@Controller("dev")
@UseGuards(DevKeyGuard)
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
}
