import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ActiveFolder } from "../auth/decorators/active-folder.decorator";
import { Folder } from "../entities/folder/folder.model";
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
  // Folder roles removed because this controller will be deprecated.
  // @RequireFolderRole(FolderRole.READ)
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
