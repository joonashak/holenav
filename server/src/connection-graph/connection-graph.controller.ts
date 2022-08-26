import { Controller, Get, Param } from "@nestjs/common";
import { ConnectionTreeService } from "./connection-tree.service";
import { ConnectionTree } from "./dto/connection-tree.dto";

@Controller("connection-graph")
export class ConnectionGraphController {
  constructor(private connectionTreeService: ConnectionTreeService) {}

  @Get("connection-tree/:rootSystemName")
  async test(@Param("rootSystemName") rootSystemName: string): Promise<ConnectionTree> {
    return this.connectionTreeService.getConnectionTree(rootSystemName, "default");
  }
}
