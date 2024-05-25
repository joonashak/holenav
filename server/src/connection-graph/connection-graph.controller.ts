import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ActiveFolder } from "../auth/decorators/active-folder.decorator";
import { RequireFolderRole } from "../auth/decorators/role.decorator";
import { Folder } from "../entities/folder/folder.model";
import FolderRole from "../user/roles/folder-role.enum";
import { ConnectionTreeService } from "./connection-tree.service";
import {
  ConnectionTree,
  ConnectionTreeParams,
} from "./dto/connection-tree.dto";

@Controller("connection-graph")
@UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
export class ConnectionGraphController {
  constructor(private connectionTreeService: ConnectionTreeService) {}

  @Get("connection-tree/:rootSystemName")
  @RequireFolderRole(FolderRole.READ)
  async connectionTree(
    @Param() params: ConnectionTreeParams,
    @ActiveFolder() folder: Folder,
  ): Promise<ConnectionTree> {
    return this.connectionTreeService.getConnectionTree(
      params.rootSystemName,
      folder.id,
    );
  }
}
