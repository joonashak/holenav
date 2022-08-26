import { Controller, Get } from "@nestjs/common";
import { ConnectionGraphService } from "./connection-graph.service";
import { ConnectionTree } from "./dto/connection-tree.dto";

@Controller("connection-graph")
export class ConnectionGraphController {
  constructor(private connectionGraphService: ConnectionGraphService) {}

  @Get("connection-tree")
  async test(): Promise<ConnectionTree> {
    return this.connectionGraphService.getConnectionTree("Jita", "default");
  }
}
