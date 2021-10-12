import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import Roles from "../../role/roles.enum";
import { ConnectionTree } from "./dto/connectionTree.dto";
import { Wormhole } from "./wormhole.model";
import { WormholeService } from "./wormhole.service";

@Resolver()
export class WormholeResolver {
  constructor(private whService: WormholeService) {}

  @Query((returns) => ConnectionTree)
  async getConnectionTree(
    @Args("rootSystem") rootSystemName: string,
    @Args("folderId") folderId: string,
  ): Promise<ConnectionTree> {
    return this.whService.getConnectionTree(rootSystemName, folderId);
  }

  @RequireFolderRole(Roles.READ)
  @Query((returns) => [Wormhole])
  async getWormholesBySystem(
    @Args("name") systemName: string,
    @Args("folderId") folderId: string,
    @Context() ctx,
  ): Promise<Wormhole[]> {
    return this.whService.getBySystem(systemName, ctx.req.folder);
  }
}
