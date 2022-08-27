import { Controller, Get, Param } from "@nestjs/common";
import { ActiveFolder } from "../auth/decorators/active-folder.decorator";
import { RequireFolderRole } from "../auth/decorators/role.decorator";
import { Folder } from "../entities/folder/folder.model";
import FolderRole from "../user/roles/folder-role.enum";
import { ConnectionTreeService } from "./connection-tree.service";
import { ConnectionTree } from "./dto/connection-tree.dto";

@Controller("connection-graph")
export class ConnectionGraphController {
  constructor(private connectionTreeService: ConnectionTreeService) {}

  @Get("connection-tree/:rootSystemName")
  @RequireFolderRole(FolderRole.READ)
  async test(
    @Param("rootSystemName") rootSystemName: string,
    @ActiveFolder() folder: Folder,
  ): Promise<ConnectionTree> {
    return this.connectionTreeService.getConnectionTree(rootSystemName, folder.id);
  }
}
