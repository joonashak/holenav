import { Controller, Get } from "@nestjs/common";
import { ConnectionTreeService } from "./connection-tree.service";
import { ConnectionTree } from "./dto/connection-tree.dto";

@Controller("connection-graph")
export class ConnectionGraphController {
  constructor(private connectionTreeService: ConnectionTreeService) {}

  @Get("connection-tree")
  async test(): Promise<ConnectionTree> {
    return this.connectionTreeService.getConnectionTree("Jita", "default");
  }
}
