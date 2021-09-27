import { Args, Query, Resolver } from "@nestjs/graphql";
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

  @Query((returns) => [Wormhole])
  async getWormholesBySystem(@Args("systemId") systemId: string): Promise<Wormhole[]> {
    return this.whService.getBySystem(systemId);
  }
}
