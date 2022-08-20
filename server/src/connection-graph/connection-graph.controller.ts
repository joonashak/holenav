import { Controller, Get } from "@nestjs/common";
import { ConnectionGraphService } from "./connection-graph.service";

@Controller("connection-tree")
export class ConnectionGraphController {
  constructor(private connectionGraphService: ConnectionGraphService) {}
  @Get("test")
  async test() {
    return this.connectionGraphService.test();
  }
}
