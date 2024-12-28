import { Args, Query, Resolver } from "@nestjs/graphql";
import { FolderAction } from "../../access-control/folder/folder-role/folder-action.enum";
import { RequireFolderAccess } from "../../access-control/folder/require-folder-access.decorator";
import { ConnectionGraphService } from "./connection-graph.service";
import { FindConnectionGraph } from "./dto/find-connection-graph.dto";

@Resolver()
export class ConnectionGraphResolver {
  constructor(private connectionGraphService: ConnectionGraphService) {}

  @RequireFolderAccess(FolderAction.Read)
  @Query(() => FindConnectionGraph)
  async findConnectionGraph(
    @Args("root") root: string,
    @Args("folderId") folderId: string,
  ): Promise<FindConnectionGraph> {
    return this.connectionGraphService.findBySystem(root, folderId);
  }
}
